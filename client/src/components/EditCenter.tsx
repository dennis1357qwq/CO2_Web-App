import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CenterObj } from "./CenterInterface";
import { Map } from "./Map";

export function EditCenter(props: CenterObj) {
  const [CenterName, setCenterName] = useState("");
  const [CenterLocation, setCenterLocation] = useState("");
  const [CenterPeakConsumption, setCenterPeakConsumption] = useState("");
  const [NumberError, setNumberError] = useState(false);
  const [NoChangesError, setNoChangesError] = useState(false);
  const [useAddress, setUseAddress] = useState(true);
  const [validationError, setValidationError] = useState(false);
  const [PostUKok, setPostUKok] = useState(true);
  const [CenterLattitude, setCenterLattitude] = useState("");
  const [CenterLongitude, setCenterLongitude] = useState("");
  const [CenterAdressUnitNr, setCenterAdressUnitNr] = useState("");
  const [CenterAdressLine1, setCenterAdressLine1] = useState("");
  const [CenterAdressLine2, setCenterAdressLine2] = useState("");
  const [CenterAdressCity, setCenterAdressCity] = useState("");
  const [CenterAdressRegion, setCenterAdressRegion] = useState("");
  const [CenterAdressPostCode, setCenterAdressPostCode] = useState("");
  const [CenterAdressCountry, setCenterAdressCountry] = useState("");
  const navigate = useNavigate();

  const dialog = document.querySelector("dialog");

  const checkAndSetPeakCons = (prop: any) => {
    if (isNaN(prop)) return setNumberError(true);
    setCenterPeakConsumption(prop);
  };

  const validateNumberInput = (value: any, setValue: any) => {
    if (value === "-") setValue("-");
    if (isNaN(value)) return;
    setValue(value);
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
        <form onSubmit={() => {}}>
          <div id="location-solution-button">
            <input
              type="radio"
              value="Coordinates"
              name="location"
              placeholder=""
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
                placeholder={props.name}
                onChange={(e) => setCenterName(e.target.value)}
              ></input>
            </div>
            <div id="peak-consumption-input" className="input-block">
              <label>peak Consumption : </label>
              <input
                type="text"
                placeholder={"" + props.peak_consumption}
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
                      placeholder={"" + props.lattitude}
                      onChange={(e) =>
                        validateNumberInput(e.target.value, setCenterLattitude)
                      }
                      size={10}
                    ></input>

                    <input
                      type="text"
                      value={CenterLongitude}
                      placeholder={"" + props.longitude}
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
                    placeholder={props.adress.adress_line_1}
                    onChange={(e) => setCenterAdressLine1(e.target.value)}
                  ></input>
                </div>
                <div id="address-line-2-input" className="input-block">
                  <label>address line 2 : </label>
                  <input
                    type="text"
                    value={CenterAdressLine2}
                    placeholder={props.adress.adress_line_2}
                    onChange={(e) => setCenterAdressLine2(e.target.value)}
                  ></input>
                </div>
                <div id="unitnr-input" className="input-block">
                  <label>Unitnr. : </label>
                  <input
                    type="text"
                    value={CenterAdressUnitNr}
                    placeholder={
                      (props.adress.unit_number = 0
                        ? props.adress.unit_number
                        : "")
                    }
                    onChange={(e) => setCenterAdressUnitNr(e.target.value)}
                  ></input>
                </div>
                <div id="city-input" className="input-block">
                  <label>city : </label>
                  <input
                    type="text"
                    value={CenterAdressCity}
                    placeholder={props.adress.city}
                    onChange={(e) => setCenterAdressCity(e.target.value)}
                  ></input>
                </div>
                <div id="postcode-input" className="input-block">
                  <label>postcode : </label>
                  <input
                    type="text"
                    value={CenterAdressPostCode}
                    placeholder={props.adress.postal_code}
                    onChange={(e) => setCenterAdressPostCode(e.target.value)}
                  ></input>
                </div>
                <div id="region-input" className="input-block">
                  <label>state : </label>
                  <input
                    type="text"
                    value={CenterAdressRegion}
                    placeholder={props.adress.region}
                    onChange={(e) => setCenterAdressRegion(e.target.value)}
                  ></input>
                </div>
                <div id="country-input" className="input-block">
                  <label>country : </label>
                  <input
                    type="text"
                    value={CenterAdressCountry}
                    placeholder={props.adress.country}
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
            <button id="AddSubmitButton" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="Button-Message-row">
          <div className="Button-row">
            <button onClick={handleClickCloseEditor}>Cancel</button>
          </div>
          {NoChangesError ? (
            <label id="NoChangesLabel">No changes made!</label>
          ) : (
            ""
          )}
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
