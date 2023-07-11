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

  async function handleSubmit() {
    const scenario = {
      scenario_id: backendScenario.scenario_id,
      user_id: user_id,
      centers: cen,
    };

    fetch(`/api/scenario/${backendScenario.scenario_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scenario),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    navigate(`/scenario/${backendScenario.scenario_id}`);
  }

  const cen: number[] = [];

  const included: number[] = [];
  for (let i = 0; i < backendScenario.centers.length; i++){
    included.push(backendScenario.centers[i].center_id);
  }

  console.log(`current ids`);
  console.log(included);

  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <button onClick={handleClickOpenEditor}>Edit</button>

      <dialog className="Dialog-wrap" id="dialog">
        <div className="EditScenario-wrapper">
          <form className="Edit-form">
            <div className="Edit-form-labels">
              <h1>Scenario {id} </h1>
            </div>
            <div>
              <h1> Centers</h1>
              {typeof backendCenters === "undefined" ? (
                <div>Loading ...</div>
              ) : (
                backendCenters.centers.map(
                  (center: CenterObj, i: number = center.center_id) => (
                    <div key={i}>
                      {
                        included.includes(center.center_id) ?(
                          <div id="adding-center-button">
                        <input
                          type="checkbox"
                          value="Add"
                          name="checker"
                          onChange={() => {
                            if (cen.indexOf(center.center_id) > -1) {
                              const index = cen.indexOf(center.center_id);
                              cen.splice(index, 1);
                            } else {
                              cen.push(center.center_id);
                            }
                            console.log(cen);
                          }
                        }
                        />
                        <label> {center.name}</label>
                      </div>

                        ):(
                          <div id="adding-center-button">
                        <input
                          type="checkbox"
                          value="Add"
                          name="checker"
                          
                          onChange={() => {
                            if (cen.indexOf(center.center_id) > -1) {
                              const index = cen.indexOf(center.center_id);
                              cen.splice(index, 1);
                            } else {
                              cen.push(center.center_id);
                            }
                            console.log(cen);
                          }}
                        />
                        <label> {center.name}</label>
                      </div>

                        )
                        
                      }
                      
                    </div>
                  )
                )
              )}
            </div>
          </form>

          <div className="Button-Message-row">
            <div className="Button-row">
            <button id="AddSubmitButton" type="submit" onClick={handleSubmit}>
            Submit
          </button>
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
