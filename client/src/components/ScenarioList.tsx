import * as React from "react";
import { useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { Map } from "./Map";
import { CenterObj } from "./CenterInterface";

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

  console.log(backendScenarios);

  return (
    <div className="grid grid-cols-1 place-items-center gap-5 pt-5">
      {typeof backendScenarios.scenarios === "undefined" ? (
        <div>Loading ...</div>
      ) : (
        backendScenarios.scenarios.map(
          (scenario: ScenarioObj, i: number = scenario.scenario_id) => (
            <div
              className="block min-w-[30%] max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              key={i}
            >
              <NavLink key={i} to={`/co2/scenario/${scenario.scenario_id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Scenario {scenario.scenario_id}
                </h5>
                <h5 className="font-normal w-40 text-gray-700 dark:text-gray-400">
                  {scenario.centers.length > 2 ? (
                    <div>
                      {scenario.centers[0].name}, {scenario.centers[1].name},
                      ...
                    </div>
                  ) : scenario.centers.length == 1 ? (
                    <div> {scenario.centers[0].name}</div>
                  ) : (
                    <div>
                      {scenario.centers[0].name}, {scenario.centers[1].name}
                    </div>
                  )}
                </h5>
              </NavLink>
            </div>
          )
        )
      )}
    </div>
  );
}

export default ScenarioList;
