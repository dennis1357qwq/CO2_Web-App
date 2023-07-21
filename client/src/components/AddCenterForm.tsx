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

            a = await checkPostalCode(re.postcode);
            const adress = {
              nr: re.house_number ? re.house_number : 0,
              line_1: re.road,
              line_2: "",
              city: re.city
                ? re.city
                : re.state_district
                ? re.state_district
                : re.town,
              region: re.state,
              postCode: a.postcode,
              country: re.country,
            };
            const center = {
              CenterName: CenterName,
              CenterPeakConsumption: CenterPeakConsumption,
              lat: CenterLattitude,
              long: CenterLongitude,
              outPost: a.outcode,
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

        navigate(`/co2/dashboard/${id}`);
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
      <div className="max-w-m flex flex-col justify-center items-center">
        <form
          id="AddCenterForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 min-w-[40%]"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start mb-6">
            <div className="flex items-center mb-2">
              <input
                id="radio-adress"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                type="radio"
                value="Address"
                name="location"
                defaultChecked
                onChange={() => {
                  setUseAddress(!useAddress);
                }}
              />
              <label
                htmlFor="radio-adress"
                className="ml-2 text-sm font-medium text-gray-600"
              >
                Adress
              </label>
              <input
                id="radio-coordinates"
                className="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                type="radio"
                value="Coordinates"
                name="location"
                onChange={() => {
                  setUseAddress(!useAddress);
                }}
              />
              <label
                htmlFor="radio-coordinates"
                className="ml-2 text-sm font-medium text-gray-600"
              >
                Coordinates
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Center Name
            </label>
            <input
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              value={CenterName}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="peak-consumption"
            >
              Peak Consumption
            </label>
            <input
              id="peak-consumption"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              value={CenterPeakConsumption}
              onChange={(e) =>
                validateNumberInput(e.target.value, setCenterPeakConsumption)
              }
            ></input>
          </div>
          {!useAddress ? (
            <>
              <Map points={[]} spawn={[]} showAdress={false} />
              <div className="mb-6 mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="lat"
                >
                  Lattitude
                </label>
                <div>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="lat"
                    type="text"
                    value={CenterLattitude}
                    onChange={(e) =>
                      validateNumberInput(e.target.value, setCenterLattitude)
                    }
                    size={10}
                  ></input>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                    htmlFor="long"
                  >
                    Longitude
                  </label>
                  <input
                    id="long"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="adress-line-1"
                >
                  Adress Line 1:{" "}
                </label>
                <input
                  id="adress-line-1"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressLine1}
                  onChange={(e) => setCenterAdressLine1(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="adress-line-2"
                >
                  Adress Line 2:
                </label>
                <input
                  id="adress-line-2"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressLine2}
                  onChange={(e) => setCenterAdressLine2(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="unit-nr"
                >
                  Unit:{" "}
                </label>
                <input
                  id="unit-nr"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressUnitNr}
                  onChange={(e) => setCenterAdressUnitNr(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="city"
                >
                  City:
                </label>
                <input
                  id="city"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressCity}
                  onChange={(e) => setCenterAdressCity(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="postcode"
                >
                  Postcode:
                </label>
                <input
                  id="postcode"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressPostCode}
                  onChange={(e) => setCenterAdressPostCode(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="state"
                >
                  State:
                </label>
                <input
                  id="state"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressRegion}
                  onChange={(e) => setCenterAdressRegion(e.target.value)}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  htmlFor="country"
                >
                  Country:
                </label>
                <input
                  id="country"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  value={CenterAdressCountry}
                  onChange={(e) => setCenterAdressCountry(e.target.value)}
                ></input>
              </div>
            </>
          )}
          {validationError ? (
            <p className="text-red-700">Incomplete input!</p>
          ) : (
            ""
          )}
          {!PostUKok ? (
            <p className="text-red-700">Adress has to be in UK!</p>
          ) : (
            ""
          )}
          <div className="InputLastLine">
            <button
              className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
              type="submit"
            >
              Add Center
            </button>
            <NavLink id="AddNavLink" to={`/co2/dashboard/${id}`}>
              <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-red-800 focus:outline-none focus:shadow-outline text-l font-medium">
                Cancel
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
