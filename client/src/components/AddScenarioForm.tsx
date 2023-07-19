import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { CenterStack, CenterObj, adress } from "./CenterInterface";
import { UserContext } from "../context/UserContext";
import Checkbox from "./Checkbox";

export function AddScenarioForm() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

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

  const user_id = userContext?.user?.user_id;
  const path = `/api/${user_id}`;

  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });
  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  const [inputScenario, setInputScenario] = React.useState<ScenarioObj>({
    scenario_id: 0,
    user_id: 0,
    centers: [],
  });

  const [userId, setUserId] = useState("");
  const [centerList, setCenterList] = useState([]);

  console.log(inputScenario);
  const cen: number[] = [];

  async function handleSubmit() {
    const scenario = {
      user_id: user_id,
      centers: cen,
    };

    fetch("/api/newScenario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scenario),
    })
      .then((response) => response.json())
      .then((data) => setInputScenario(data));

    navigate(`/dashboard/${user_id}`);
    window.location.reload();
  }

  return (
    <>
      <div className="max-w-m flex flex-col justify-center items-center">
        <form
          id="AddCenterForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 min-w-[40%]"
        >
          <div className="row-wrapper">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray">
              Create New Scenario
            </h3>
            <div className="row-wrapper">
              <div className="flex items-center mb-2">
                <div className="CenterListWrapper">
                  {typeof backendCenters.centers === "undefined" ? (
                    <div>Loading ...</div>
                  ) : (
                    backendCenters.centers.map(
                      (center: CenterObj, i: number = center.center_id) => (
                        <div key={i}>
                          <div id="adding-center-button">
                            <Checkbox
                              label={center.name}
                              cen={cen}
                              checked={false}
                              center={center}
                            />
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="InputLastLine">
              <NavLink id="AddNavLink" to={`/dashboard/${user_id}`}>
                <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-red-800 focus:outline-none focus:shadow-outline text-l font-medium">
                  Cancel
                </button>
              </NavLink>
              <button
                className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
                type="submit"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
