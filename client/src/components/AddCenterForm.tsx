import React from "react";
import { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";

// interface CenterObj {
//   center_id: number;
//   location: string;
//   peak_consumption: number;
//   name: string;
// }

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

    navigate("/");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>name : </label>
          <input
            type="text"
            value={CenterName}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>location : </label>
          <input
            type="text"
            value={CenterLocation}
            onChange={(e) => setCenterLocation(e.target.value)}
          ></input>
          <label>peak Consumption : </label>
          <input
            type="number"
            value={CenterPeakConsumption}
            onChange={(e) => setCenterPeakConsumption(+e.target.value)}
          ></input>

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}
