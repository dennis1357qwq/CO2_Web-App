import * as React from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { UserContext } from "../context/UserContext";
import { Map } from "./Map";
import { CenterObj, CenterStack } from "./CenterInterface";
import { ScenarioObj } from "./ScenarioInterface";
import { EditScenario } from "./EditScenario";

export function Scenario() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [backendScenario, setBackendScenario] = React.useState<ScenarioObj>({
    scenario_id: 0,
    user_id: 0,
    centers: [],
  });

  // check for logged in !!
  useEffect(() => {
    // Check of authenticated, wenn nicht localstorage, wenn nicht zum login
    async function checkLoggedIn() {
      if (userContext.authenticated) {
        return null;
      }
      const loggedIn = localStorage.getItem("status");
      // console.log(loggedIn);
      if (loggedIn) {
        const username = localStorage.getItem("username");
        const user_id = Number(localStorage.getItem("user_id"));
        // console.log(user_id);
        await userContext.setUser({
          username,
          user_id,
        });

        await userContext.setAuthenticated(true);
      } else {
        navigate("/");
      }
    }
    checkLoggedIn();
  }, []);

  const path = `/api/scenario/${id}`;
  const user_id = userContext.user?.user_id;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendScenario(data.scenario);
      });
  }, []);

  return (
    <div className="Scenario-wrapper">
      <div className="Scenario">
        <div className="Scenario-data-list">
          <li>Scenario: {backendScenario.scenario_id}</li>
          <li>Centers:</li>
          {typeof backendScenario.centers === "undefined" ? (
            <div>Loading ...</div>
          ) : (
            backendScenario.centers.map(
              (center: CenterObj, i: number = center.center_id) => (
                <div key={i}>
                  <NavLink key={i} to={`/center/${center.center_id}`}>
                    <p key={center.center_id}>{center.name}</p>
                  </NavLink>
                </div>
              )
            )
          )}
        </div>

        <div className="Center-buttons">
          <EditScenario
            scenario_id={backendScenario.scenario_id}
            user_id={backendScenario.user_id}
            centers={backendScenario.centers}
          />
          <DeleteButton
            id={backendScenario.scenario_id}
            path={path}
            user_id={backendScenario.user_id}
          />
        </div>
        <NavLink className={"Home-Link"} to={`/dashboard/${user_id}`}>
          Home
        </NavLink>
      </div>
      <Map centers={backendScenario.centers} />
    </div>
  );
}

export default Scenario;
