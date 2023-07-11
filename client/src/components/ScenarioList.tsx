import * as React from "react";
import { useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { Map } from "./Map";

export function ScenarioList() {
  const userContext = useContext(UserContext);
  const { id } = useParams();
  // console.log(userContext.user);
  const path = `/api/scenarios/${id}`;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendScenarios(data);
      });
  }, []);

  const [backendScenarios, setBackendScenarios] = React.useState<ScenarioStack>(
    {
      scenarios: [],
    }
  );

  return (
    <div className="ScenariosListWrapper">
      {typeof backendScenarios.scenarios === "undefined" ? (
        <div>Loading ...</div>
      ) : (
        backendScenarios.scenarios.map(
          (scenario: ScenarioObj, i: number = scenario.scenario_id) => (
            <div key={i}>
              <NavLink key={i} to={`/scenario/${scenario.scenario_id}`}>
                <p key={scenario.scenario_id}>
                  Scenario {scenario.scenario_id}
                </p>
              </NavLink>
            </div>
          )
        )
      )}
    </div>
  );
}

export default ScenarioList;
