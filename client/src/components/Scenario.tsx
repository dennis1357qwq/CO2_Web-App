import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { UserContext } from "../context/UserContext";
import { Map } from "./Map";
import { CenterObj, CenterStack } from "./CenterInterface";
import { ScenarioObj } from "./ScenarioInterface";
import { EditScenario } from "./EditScenario";
import DataPieChart from "./PieChart";
import DataLineChart from "./LineChart";
import { ScenarioHeader } from "./ScenarioHeader";
import "./Center.css";

export function Scenario() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCarbonData, setCurrentCarbonData] = useState<any>();
  const [currentGenerationMix, setcurrentGenerationMix] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
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
  const user_id = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackendScenario(data.scenario);
        backendScenario.user_id = user_id;
        let currCarb = 0;
        let currMix = data.scenario.carbon[0].data[0].data[0].generationmix;
        for (let i = 0; i < data.scenario.centers.length; i++) {
          currCarb +=
            data.scenario.carbon[i].data[0].data[0].intensity.forecast;
          for (
            let j = 0;
            j < data.scenario.carbon[i].data[0].data[0].generationmix.length;
            j++
          ) {
            currMix[j].perc +=
              data.scenario.carbon[i].data[0].data[0].generationmix[j].perc;
          }
        }

        setcurrentGenerationMix(currMix);
        setCurrentCarbonData(currCarb);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        <div className="Scenario-wrapper">
          <div className="Scenario">
            <ScenarioHeader
              Scenario={backendScenario}
              path={path}
              user_id={user_id}
            />
            <div>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                CURRENT CARBON INTENSITY:
              </p>
              <p className="text-3xl font-medium">
                {currentCarbonData} gCO
                <sub>2</sub>/kWH
              </p>
            </div>
            <div className="row-wrapper">
              <div className="Scenario-data-list">
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  CENTERS INCLUDED:
                </p>
                {typeof backendScenario.centers === "undefined" ? (
                  <div>Loading ...</div>
                ) : (
                  backendScenario.centers.map(
                    (center: CenterObj, i: number = center.center_id) => (
                      <div key={i}>
                        <NavLink key={i} to={`/center/${center.center_id}`}>
                          <p
                            className="text-3xl font-medium"
                            key={center.center_id}
                          >
                            {center.name}
                          </p>
                        </NavLink>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
            <div className="row-wrapper">
              <div className="pie-wrapper">
                <DataPieChart values={currentGenerationMix} />
              </div>
              <div className="Map-Wrapper">
                <div className="MapSt">
                  <Map
                    points={backendScenario.centers}
                    spawn={[
                      backendScenario.centers[0].lattitude,
                      backendScenario.centers[0].longitude,
                      7,
                    ]}
                    showAdress={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default Scenario;
