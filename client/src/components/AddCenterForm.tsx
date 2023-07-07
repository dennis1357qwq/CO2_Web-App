import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adress, CenterObj } from "./CenterInterface";
import { Map } from "./Map";

export function AddCenterForm() {
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    name: "",
    peak_consumption: 0,
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
  const [CenterName, setName] = useState("");
  const [CenterLattitude, setCenterLattitude] = useState("");
  const [CenterLongitude, setCenterLongitude] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  const [CenterOuterPostCode, setCenterOuterPostCode] = useState("");
  const [CenterAdressUnitNr, setCenterAdressUnitNr] = useState("");
  const [CenterAdressLine1, setCenterAdressLine1] = useState("");
  const [CenterAdressLine2, setCenterAdressLine2] = useState("");
  const [CenterAdressCity, setCenterAdressCity] = useState("");
  const [CenterAdressRegion, setCenterAdressRegion] = useState("");
  const [CenterAdressPostCode, setCenterAdressPostCode] = useState("");
  const [CenterAdressCountry, setCenterAdressCountry] = useState("");
  const [PostUKok, setPostUKok] = useState(false);
  const [validationError, setValidateError] = useState(false);
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

  const validateNuberInput = (value: any, setValue: any) => {
    if (isNaN(value)) return;
    setValue(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    validateInput();
    if (validationError) console.log("return");
    checkPostalCode(CenterAdressPostCode);
    let re = {};
    if (CenterLattitude && CenterLongitude) {
      re = await getAdressFromLatLong(+CenterLattitude, +CenterLongitude);
      console.log(re);
    }
    //fill out center obj dependent on whats already there
    const adress = {
      CenterAdressUnitNr,
      CenterAdressLine1,
      CenterAdressLine2,
      CenterAdressRegion,
      CenterAdressCity,
      CenterAdressPostCode,
      CenterAdressCountry,
    };
    const center = {
      CenterName,
      CenterPeakConsumption,
      CenterLattitude,
      CenterLongitude,
      CenterOuterPostCode,
      adress,
    };

    // fetch("/api/newCenter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(center),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    //Info notification: Center with return data has been added!

    // navigate("/dashboard");
  };

  function validateInput() {
    if (
      !CenterName ||
      !CenterPeakConsumption ||
      (!(CenterLattitude && CenterLongitude) &&
        (!CenterAdressLine1 ||
          !CenterAdressUnitNr ||
          !CenterAdressCity ||
          !CenterAdressCountry ||
          !CenterAdressRegion ||
          !CenterAdressPostCode))
    ) {
      setValidateError(true);
      console.log("validation error");
    } else {
      setValidateError(false);
      console.log("valid ok");
    }
  }

  function checkPostalCode(postal_code: string) {
    fetch(`https://api.postcodes.io/postcodes/${postal_code}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("PostCode  - error"); //error handling
          setPostUKok(false);
        } else {
          setCenterOuterPostCode(data.result.outcode);
          setPostUKok(true);
        }
      });
  }

  async function getAdressFromLatLong(lattitude: number, longitude: number) {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lattitude}&lon=${longitude}`
    );

    const result = await response.json();
    return result.address;
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
                  validateNuberInput(e.target.value, setCenterPeakConsumption)
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
                        validateNuberInput(e.target.value, setCenterLattitude)
                      }
                      size={10}
                    ></input>

                    <input
                      type="text"
                      value={CenterLongitude}
                      onChange={(e) =>
                        validateNuberInput(e.target.value, setCenterLongitude)
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
                  <label>region : </label>
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
            <label id="NoChangesLabel">
              Name and Coordinates or Name and Address required!
            </label>
          ) : (
            ""
          )}
          <div className="InputLastLine">
            <NavLink id="AddNavLink" to="/dashboard">
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
