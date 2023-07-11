import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { UserContext } from "../context/UserContext";
import { CenterStack, CenterObj } from "./CenterInterface";

export function EditScenario(props: ScenarioObj) {
  const [NoChangesError, setNoChangesError] = useState(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const user_id = userContext.user?.user_id;
  const { id } = useParams();
  const path1 = `/api/${user_id}`;
  const path = `/api/scenario/${id}`;

  // getting all centers
  useEffect(() => {
    fetch(path1)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });

  // get scenario specific centers
  const [backendScenario, setBackendScenario] = React.useState<ScenarioObj>({
    scenario_id: 0,
    user_id: 0,
    centers: [],
  });
  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendScenario(data.scenario);
      });
  }, []);

  const dialog = document.querySelector("dialog");

  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  const handleClickOpenEditor = () => {
    dialog?.showModal();
  };

  const handleClickCloseEditor = () => {
    dialog?.close();
  };

  return (
    <>
      <button onClick={handleClickOpenEditor}>Edit</button>

      <dialog className="Dialog-wrap" id="dialog">
        <div className="EditScenario-wrapper">
          <form className="Edit-form">
            <div className="Edit-form-labels">
              <h1>Scenario {id} </h1>
              <label>centers included: </label>
            </div>
            <div className="Edit-form-inputs">
              {typeof backendScenario.centers === "undefined" ? (
                <div>Loading ...</div>
              ) : (
                backendScenario.centers.map(
                  (center: CenterObj, i: number = center.center_id) => (
                    <div key={i}>
                      <li>{center.name}</li>
                    </div>
                  )
                )
              )}
            </div>
            <div>
              <h1> Centers available</h1>
              {typeof backendCenters === "undefined" ? (
                <div>Loading ...</div>
              ) : (
                backendCenters.centers.map(
                  (center: CenterObj, i: number = center.center_id) => (
                    <div key={i}>
                      <li>{center.name}</li>
                    </div>
                  )
                )
              )}
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

function callPutApi(id: number, centers: []) {
  const scenario = {
    scenario_id: id,
    centers: centers,
  };

  fetch(`/api/scenario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scenario),
  })
    .then((response) => response.json())
    .then((data) => {
      //   succes message
    });
}
