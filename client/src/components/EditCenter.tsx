import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditCenter(props: {
  id: number;
  name: string;
  location: string;
  peakCons: number;
}) {
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

  const checkIfChanged = () => {
    const cName = !CenterName ? props.name : CenterName;
    const cLoc = !CenterLocation ? props.location : CenterLocation;
    const cPeakCon = !CenterPeakConsumption
      ? props.peakCons
      : CenterPeakConsumption;
    if (
      cName === props.name &&
      cLoc === props.location &&
      +cPeakCon === props.peakCons
    )
      return true;
  };

  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  const handleClickOpenEditor = () => {
    dialog?.showModal();
  };

  const handleClickCloseEditor = () => {
    dialog?.close();
  };

  const testfunc = () => {
    if (checkIfChanged()) {
      setNoChangesError(true);
    }
    if (!checkIfChanged()) {
      setNoChangesError(false);
      callPutApi(
        props.id,
        CenterName ? CenterName : props.name,
        CenterPeakConsumption ? +CenterPeakConsumption : props.peakCons,
        CenterLocation ? CenterLocation : props.location
      );
      dialog?.close();
      navigate(0);
    }
  };

  return (
    <>
      <button onClick={handleClickOpenEditor}>Edit</button>
      <dialog id="dialog">
        <form>
          <input
            type="text"
            value={CenterName}
            placeholder={props.name}
            onChange={(e) => setCenterName(e.target.value)}
          ></input>
          <label>location : </label>
          <input
            type="text"
            value={CenterLocation}
            placeholder={props.location}
            onChange={(e) => setCenterLocation(e.target.value)}
          ></input>
          <label>peak Consumption : </label>
          <input
            type="text"
            value={CenterPeakConsumption}
            placeholder={`${props.peakCons}`}
            onChange={(e) => checkAndSetPeakCons(e.target.value)}
          ></input>
        </form>

        <button onClick={testfunc}>Edit</button>
        <button onClick={handleClickCloseEditor}>cancel</button>
        {NoChangesError ? <label>no changes</label> : ""}
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
