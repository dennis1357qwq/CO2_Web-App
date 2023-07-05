import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function AddCenterForm() {
  const [CenterName, setName] = useState("");
  const [CenterLocation, setCenterLocation] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const center = { CenterLocation, CenterPeakConsumption, CenterName };

    fetch("/api/newCenter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(center),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    //Info notification: Center with return data has been added!

    navigate("/dashboard");
  };
  return (
    <>
      <div>
        <form className="AddCenter-wrapper" onSubmit={handleSubmit}>
          <div className="Edit-form">
            <div className="Edit-form-labels">
              <label>name : </label>
              <label>Street : </label>
              <label>Nr : </label>
              <label>City : </label>
              <label>postcode : </label>
              <label>peak Consumption : </label>
            </div>
            <div className="Edit-form-inputs">
              <input
                type="text"
                value={CenterName}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input type="text"></input>
              <input
                type="text"
                value={CenterLocation}
                onChange={(e) => setCenterLocation(e.target.value)}
              ></input>
              <input
                type="number"
                value={CenterPeakConsumption}
                onChange={(e) => setCenterPeakConsumption(+e.target.value)}
              ></input>
            </div>
          </div>
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
