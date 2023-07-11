import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { adress, CenterObj } from "./CenterInterface";
import { Map } from "./Map";
import { UserContext } from "../context/UserContext";

export function AddCenterForm() {
  const { id } = useParams();
  const [inputCenter, setInputCenter] = React.useState<CenterObj>({
    center_id: 0,
    name: "",
    peak_consumption: 0,
    user_id: 0,
    lattitude: 0,
    longitude: 0,
    outer_postcode: "",
    adress: {
      unit_number: "",
      adress_line_1: "",
      adress_line_2: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
    },
  });

  const [useAddress, setUseAddress] = useState(true);
  const [notUkFlag, setNotUkFlag] = useState(false);
  const [CenterName, setName] = useState("");
  const [CenterLattitude, setCenterLattitude] = useState("");
  const [CenterLongitude, setCenterLongitude] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  const [UserId, setUserId] = useState();
  const [CenterOuterPostCode, setCenterOuterPostCode] = useState("");
  const [CenterAdressUnitNr, setCenterAdressUnitNr] = useState("");
  const [CenterAdressLine1, setCenterAdressLine1] = useState("");
  const [CenterAdressLine2, setCenterAdressLine2] = useState("");
  const [CenterAdressCity, setCenterAdressCity] = useState("");
  const [CenterAdressRegion, setCenterAdressRegion] = useState("");
  const [CenterAdressPostCode, setCenterAdressPostCode] = useState("");
  const [CenterAdressCountry, setCenterAdressCountry] = useState("");
  const [innerPost, setInnerPost] = useState("");
  const [PostUKok, setPostUKok] = useState(true);
  const [validationError, setValidationError] = useState(false);
  const [latAdress, setLatAdress] = React.useState<adress>({
    unit_number: "",
    adress_line_1: "",
    adress_line_2: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
  });

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // check for logged in !!
  useEffect(() => {
    // Check of authenticated, wenn nicht localstorage, wenn nicht zum login
    async function checkLoggedIn() {
      if (userContext.authenticated) {
        return null;
      }
      const loggedIn = localStorage.getItem("status");
      // console.log(loggedIn);
      if (loggedIn) {
        const username = localStorage.getItem("username");
        const user_id = Number(localStorage.getItem("user_id"));
        // console.log(user_id);
        await userContext.setUser({
          username,
          user_id,
        });
        await userContext.setAuthenticated(true);
      } else {
        navigate("/");
      }
    }
    checkLoggedIn();
  }, []);
  const user_id = userContext.user?.user_id;

  const validateNumberInput = (value: any, setValue: any) => {
    if (value === "-") setValue("-");
    if (isNaN(value)) return;
    setValue(value);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    let a = { postcode: "", outcode: "" };
    a.postcode = "";
    if (CenterAdressPostCode) {
      a = await checkPostalCode(CenterAdressPostCode);
    }
    validateInput();
    if (
      !(
        !CenterName ||
        !CenterPeakConsumption ||
        (!(CenterLattitude && CenterLongitude) &&
          (!CenterAdressLine1 ||
            !CenterAdressUnitNr ||
            !CenterAdressCity ||
            !CenterAdressRegion ||
            !CenterAdressCountry ||
            !CenterAdressPostCode))
      )
    ) {
      if (PostUKok) {
        if (useAddress) {
          const le = await getLatLongFromAdress(
            CenterAdressLine1,
            CenterAdressUnitNr,
            CenterAdressCity,
            CenterAdressRegion,
            CenterAdressCountry,
            a.postcode
          );

          const adress = {
            nr: CenterAdressUnitNr,
            line_1: CenterAdressLine1,
            line_2: CenterAdressLine2,
            city: CenterAdressCity,
            region: CenterAdressRegion,
            postCode: a.postcode,
            country: CenterAdressCountry,
          };
          const center = {
            CenterName: CenterName,
            CenterPeakConsumption: CenterPeakConsumption,
            lat: le.lat,
            long: le.lon,
            outPost: a.outcode,
            adress: adress,
          };
          sendData(center);
        } else {
          if (CenterLattitude && CenterLongitude) {
            const re = await getAdressFromLatLong(
              +CenterLattitude,
              +CenterLongitude
            );

            const adress = {
              nr: re.house_number ? re.house_number : 0,
              line_1: re.road,
              line_2: "",
              city: re.city,
              region: re.state,
              postCode: re.postcode,
              country: re.country,
            };
            const center = {
              CenterName: CenterName,
              CenterPeakConsumption: CenterPeakConsumption,
              lat: CenterLattitude,
              long: CenterLongitude,
              outPost: re.postcode,
              adress: adress,
            };

            if (center.adress.country === "United Kingdom") {
              sendData(center);
            } else {
              setPostUKok(false);
            }

            console.log(center);
          }
        }

        //Info notification: Center with return data has been added!

        navigate(`/dashboard/${id}`);
      }
    }
  }

  function sendData(center: any) {
    fetch(`/api/newCenter/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(center),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function validateInput() {
    if (
      !CenterName ||
      !CenterPeakConsumption ||
      (!(CenterLattitude && CenterLongitude) &&
        (!CenterAdressLine1 ||
          !CenterAdressUnitNr ||
          !CenterAdressCity ||
          !CenterAdressRegion ||
          !CenterAdressCountry ||
          !CenterAdressPostCode))
    ) {
      setValidationError(true);
      console.log("validation error");
    } else {
      setValidationError(false);
      console.log("valid ok");
    }
  }

  async function checkPostalCode(postal_code: string) {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${postal_code}`
    );

    const result = await response.json();

    if (result.error) {
      console.log("PostCode  - error"); //error handling
      setPostUKok(false);
    } else {
      setCenterOuterPostCode(result.result.outcode);
      setCenterAdressPostCode(result.result.postcode);
      setPostUKok(true);
    }
    return result.result;
  }

  async function getAdressFromLatLong(lattitude: number, longitude: number) {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lattitude}&lon=${longitude}`
    );

    const result = await response.json();
    console.log(result.address);
    return result.address;
  }

  async function getLatLongFromAdress(
    street: string,
    hnr: string,
    city: string,
    state: string,
    country: string,
    postcode: string
  ) {
    const response = await fetch(
      `https://geocode.maps.co/search?street=${hnr}+${street}&city=${city}&state=${state}&postalcode=${postcode}&country=${country}`
    );

    const result = await response.json();

    setCenterLattitude(result[0].lat);
    setCenterLongitude(result[0].lon);

    return result[0];
  }

  return (
    <>
      <div>
        <form className="AddCenter-wrapper" onSubmit={handleSubmit}>
          <div id="location-solution-button">
            <input
              type="radio"
              value="Coordinates"
              name="location"
              onChange={() => {
                setUseAddress(!useAddress);
              }}
            />{" "}
            use Coordinates
            <input
              type="radio"
              value="Address"
              name="location"
              defaultChecked
              onChange={() => {
                setUseAddress(!useAddress);
              }}
            />
            use Addres
          </div>
          <div className="Edit-form">
            <div id="name-input" className="input-block">
              <label>name : </label>
              <input
                type="text"
                value={CenterName}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div id="peak-consumption-input" className="input-block">
              <label>peak Consumption : </label>
              <input
                type="text"
                value={CenterPeakConsumption}
                onChange={(e) =>
                  validateNumberInput(e.target.value, setCenterPeakConsumption)
                }
              ></input>
            </div>
            {!useAddress ? (
              <>
                <Map centers={[]} />
                <div id="lat/long-input" className="input-block">
                  <label>lattitude/longitude: </label>
                  <div>
                    <input
                      type="text"
                      value={CenterLattitude}
                      onChange={(e) =>
                        validateNumberInput(e.target.value, setCenterLattitude)
                      }
                      size={10}
                    ></input>

                    <input
                      type="text"
                      value={CenterLongitude}
                      onChange={(e) =>
                        validateNumberInput(e.target.value, setCenterLongitude)
                      }
                      size={10}
                    ></input>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div id="address-line-1-input" className="input-block">
                  <label>address line 1: </label>
                  <input
                    type="text"
                    value={CenterAdressLine1}
                    onChange={(e) => setCenterAdressLine1(e.target.value)}
                  ></input>
                </div>
                <div id="address-line-2-input" className="input-block">
                  <label>address line 2 : </label>
                  <input
                    type="text"
                    value={CenterAdressLine2}
                    onChange={(e) => setCenterAdressLine2(e.target.value)}
                  ></input>
                </div>
                <div id="unitnr-input" className="input-block">
                  <label>Unitnr. : </label>
                  <input
                    type="text"
                    value={CenterAdressUnitNr}
                    onChange={(e) => setCenterAdressUnitNr(e.target.value)}
                  ></input>
                </div>
                <div id="city-input" className="input-block">
                  <label>city : </label>
                  <input
                    type="text"
                    value={CenterAdressCity}
                    onChange={(e) => setCenterAdressCity(e.target.value)}
                  ></input>
                </div>
                <div id="postcode-input" className="input-block">
                  <label>postcode : </label>
                  <input
                    type="text"
                    value={CenterAdressPostCode}
                    onChange={(e) => setCenterAdressPostCode(e.target.value)}
                  ></input>
                </div>
                <div id="region-input" className="input-block">
                  <label>state : </label>
                  <input
                    type="text"
                    value={CenterAdressRegion}
                    onChange={(e) => setCenterAdressRegion(e.target.value)}
                  ></input>
                </div>
                <div id="country-input" className="input-block">
                  <label>country : </label>
                  <input
                    type="text"
                    value={CenterAdressCountry}
                    onChange={(e) => setCenterAdressCountry(e.target.value)}
                  ></input>
                </div>
              </>
            )}
          </div>
          {validationError ? (
            <label id="NoChangesLabel">complete input!</label>
          ) : (
            ""
          )}
          {!PostUKok ? (
            <label id="NoChangesLabel">Give an Adress in Uk!</label>
          ) : (
            ""
          )}
          <div className="InputLastLine">
            <NavLink id="AddNavLink" to={`/dashboard/${id}`}>
              <button>Cancel</button>
            </NavLink>
            <button id="AddSubmitButton" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
