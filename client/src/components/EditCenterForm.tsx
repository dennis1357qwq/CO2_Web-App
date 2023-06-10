import { useEffect, useState } from "react";

export function EditCenterForm() {
  const [test, setTest] = useState(false);

  const clik = () => {
    console.log("test");
  };

  useEffect(() => {}, [test]);
  return (
    <>
      <label>name : </label>
      {/* <input
          type="text"
          value={CenterName}
          placeholder={props.name}
          onChange={(e) => checkAndSetName(e.target.value)}
        ></input>
        <label>location : </label>
        <input
          type="text"
          value={CenterLocation}
          placeholder={props.location}
          onChange={(e) => checkAndSetLocation(e.target.value)}
        ></input>
        <label>peak Consumption : </label>
        <input
          type="text"
          value={CenterPeakConsumption}
          placeholder={`${props.peakCons}`}
          onChange={(e) => checkAndSetPeakCons(e.target.value)}
        ></input>

        <button onClick={handleClickSubmitEdit}>Edit</button>
        <button onClick={handleClickCloseEditor}>cancel</button>
        {NoChangesError ? <label></label> : ""} */}
      <button
        onChange={() => {
          console.log("ewe");
        }}
      >
        clcik
      </button>
    </>
  );
}
