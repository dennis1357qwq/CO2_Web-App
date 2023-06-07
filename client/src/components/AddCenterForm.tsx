import { useState } from "react";

export function AddCenterForm() {
  const [CenterName, setName] = useState("");
  const [CenterLocation, setCenterLocation] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  return (
    <>
      <div>
        <p>name:</p>
        <input
          type="text"
          value={CenterName}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p>location:</p>
        <input
          type="text"
          value={CenterLocation}
          onChange={(e) => setCenterLocation(e.target.value)}
        ></input>
        <p>peak consumption:</p>
        <input
          type="text"
          value={CenterPeakConsumption}
          onChange={(e) => setCenterPeakConsumption(e.target.value)}
        ></input>
      </div>
    </>
  );
}
