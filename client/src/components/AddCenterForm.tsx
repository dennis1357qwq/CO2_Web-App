import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function AddCenterForm() {
  const [CenterName, setName] = useState("");
  const [CenterLattitude, setCenterLattitude] = useState("");
  const [CenterLongitude, setCenterLongitude] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState(0);
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
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    validateInput();
    checkPostalCode(CenterAdressPostCode);

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
      (!(CenterLattitude && CenterLongitude) &&
        (!CenterAdressLine1 ||
          !CenterAdressUnitNr ||
          !CenterAdressCity ||
          !CenterAdressCountry ||
          !CenterAdressRegion ||
          !CenterAdressPostCode))
    ) {
      setValidateError(true);
      console.log("error");
    } else {
      setValidateError(false);
      console.log("ok");
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

  return (
    <>
      <div>
        <form className="AddCenter-wrapper" onSubmit={handleSubmit}>
          <div className="Edit-form">
            <div className="Edit-form-labels">
              <label>name : </label>
              <label>peak Consumption : </label>
              <label>lattitude: </label>
              <label>longitude : </label>
              <label>Street : </label>
              <label>line 2 : </label>
              <label>Nr : </label>
              <label>City : </label>
              <label>postcode : </label>
              <label>region : </label>
              <label>country : </label>
            </div>
            <div className="Edit-form-inputs">
              <input
                type="text"
                value={CenterName}
                onChange={(e) => setName(e.target.value)}
              ></input>

              <input
                type="number"
                value={CenterPeakConsumption}
                onChange={(e) => setCenterPeakConsumption(+e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterLattitude}
                onChange={(e) => setCenterLattitude(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterLongitude}
                onChange={(e) => setCenterLongitude(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressLine1}
                onChange={(e) => setCenterAdressLine1(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressLine2}
                onChange={(e) => setCenterAdressLine2(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressUnitNr}
                onChange={(e) => setCenterAdressUnitNr(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressCity}
                onChange={(e) => setCenterAdressCity(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressPostCode}
                onChange={(e) => setCenterAdressPostCode(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressRegion}
                onChange={(e) => setCenterAdressRegion(e.target.value)}
              ></input>

              <input
                type="text"
                value={CenterAdressCountry}
                onChange={(e) => setCenterAdressCountry(e.target.value)}
              ></input>
            </div>
          </div>
          {validationError ? (
            <label id="NoChangesLabel">No changes made!</label>
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
