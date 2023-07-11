import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScenarioObj, ScenarioStack } from "./ScenarioInterface";
import { CenterStack, CenterObj, adress } from "./CenterInterface";
import { UserContext } from "../context/UserContext";

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
      .then((data) => console.log(data));

    navigate(`/dashboard/${user_id}`);
  }

  return (
    <>
      <form className="AddCenter-wrapper">
        <h1>New Scenario</h1>
        <div className="CenterListWrapper">
          {typeof backendCenters.centers === "undefined" ? (
            <div>Loading ...</div>
          ) : (
            backendCenters.centers.map(
              (center: CenterObj, i: number = center.center_id) => (
                <div key={i}>
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
                </div>
              )
            )
          )}
        </div>
        <div className="InputLastLine">
          <NavLink id="AddNavLink" to={`/dashboard/${user_id}`}>
            <button>Cancel</button>
          </NavLink>
          <button id="AddSubmitButton" type="submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </>
  );
}
