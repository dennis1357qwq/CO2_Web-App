import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterObj } from "./CenterInterface";

export function EditCenter(props: CenterObj) {
  const [CenterName, setCenterName] = useState("");
  const [CenterLocation, setCenterLocation] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  const [NumberError, setNumberError] = useState(false);
  const [NoChangesError, setNoChangesError] = useState(false);
  const navigate = useNavigate();

  const dialog = document.querySelector("dialog");

  const checkAndSetPeakCons = (prop: any) => {
    if (isNaN(prop)) return setNumberError(true);
    setCenterPeakConsumption(prop);
  };

  // const checkIfChanged = () => {
  //   const cName = !CenterName ? props.name : CenterName;
  //   const cLoc = !CenterLocation ? props.location : CenterLocation;
  //   const cPeakCon = !CenterPeakConsumption
  //     ? props.peakCons
  //     : CenterPeakConsumption;
  //   if (
  //     cName === props.name &&
  //     cLoc === props.location &&
  //     +cPeakCon === props.peakCons
  //   )
  //     return true;
  // };

  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  const handleClickOpenEditor = () => {
    dialog?.showModal();
  };

  const handleClickCloseEditor = () => {
    dialog?.close();
  };

  // const testfunc = () => {
  //   if (checkIfChanged()) {
  //     setNoChangesError(true);
  //   }
  //   if (!checkIfChanged()) {
  //     setNoChangesError(false);
  //     callPutApi(
  //       props.id,
  //       CenterName ? CenterName : props.name,
  //       CenterPeakConsumption ? +CenterPeakConsumption : props.peakCons,
  //       CenterLocation ? CenterLocation : props.location
  //     );
  //     dialog?.close();
  //     navigate(0);
  //   }
  // };

  return (
    <>
      <button onClick={handleClickOpenEditor}>Edit</button>

      <dialog className="Dialog-wrap" id="dialog">
        <div className="EditCenter-wrapper">
          <form className="Edit-form">
            <div className="Edit-form-labels">
              <label>name: </label>
              <label>location: </label>
              <label>peak Consumption: </label>
            </div>
            <div className="Edit-form-inputs">
              <input
                type="text"
                value={CenterName}
                placeholder={props.name}
                onChange={(e) => setCenterName(e.target.value)}
              ></input>
              <input
                type="text"
                value={CenterLocation}
                // placeholder={props.location}
                onChange={(e) => setCenterLocation(e.target.value)}
              ></input>
              <input
                type="text"
                value={CenterPeakConsumption}
                // placeholder={`${props.peakCons}`}
                onChange={(e) => checkAndSetPeakCons(e.target.value)}
              ></input>
            </div>
          </form>

          <div className="Button-Message-row">
            <div className="Button-row">
              {/* <button onClick={testfunc}>Edit</button> */}
              <button onClick={handleClickCloseEditor}>Cancel</button>
            </div>
            {NoChangesError ? (
              <label id="NoChangesLabel">No changes made!</label>
            ) : (
              ""
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

function callPutApi(id: number, name: string, peak: number, location: string) {
  const center = {
    center_id: id,
    CenterName: name,
    CenterLocation: location,
    CenterPeakConsumption: peak,
  };

  fetch(`/api/center/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(center),
  })
    .then((response) => response.json())
    .then((data) => {
      //   succes message
    });
}
