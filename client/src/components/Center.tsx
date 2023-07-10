import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";
import { UserContext } from "../context/UserContext";
import { Map } from "./Map";
import { CenterObj } from "./CenterInterface";
import "./Center.css";
import DataPieChart from "./PieChart";
import DataLineChart from "./LineChart";

export function Center() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCarbonData, setCurrentCarbonData] = useState<any>({});
  const [todayCarbonData, setTodayCarbonData] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    name: "",
    user_id: 0,
    peak_consumption: 0,
    lattitude: 0,
    longitude: 0,
    outer_postcode: "",
    adress: {
      unit_number: "",
      adress_line_1: "",
      adress_line_2: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
    },
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

  const path = `/api/center/${id}`;
  const user_id = userContext.user?.user_id;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenter(data.center);
        setCurrentCarbonData(data.currentCarbon);
        setTodayCarbonData(data.todayCarbon);
        setIsLoaded(true);
      });
  }, []);

  console.log(todayCarbonData);

  return (
    <div className="Center-wrapper">
      <div className="Center">
        <div className="Center-data-list">
          <li>Name: {backendCenter.name}</li>
          <li>
            Street: {backendCenter.adress.adress_line_1},{" "}
            {backendCenter.adress.unit_number}
          </li>
          <li>
            {backendCenter.adress.postal_code} {backendCenter.adress.city},{" "}
            {backendCenter.adress.region}
          </li>
          <li>peak-Verbrauch: {backendCenter.peak_consumption}</li>
          {isLoaded ? (
            <li>
              Current Carbon Intensity:{" "}
              {currentCarbonData.data[0].data[0].intensity.forecast} gCO_2/kWH
            </li>
          ) : (
            <li>Waiting for Data</li>
          )}
        </div>

        <div className="Center-buttons">
          <EditCenter
            center_id={backendCenter.center_id}
            name={backendCenter.name}
            peak_consumption={backendCenter.peak_consumption}
            user_id={backendCenter.user_id}
            lattitude={backendCenter.lattitude}
            longitude={backendCenter.longitude}
            outer_postcode={backendCenter.outer_postcode}
            adress={backendCenter.adress}
          />
          <DeleteButton id={backendCenter.center_id} path={path} />
        </div>
        <NavLink className={"Home-Link"} to={`/dashboard/${user_id}`}>
          Home
        </NavLink>
      </div>
      {isLoaded ? (
        <DataPieChart
          values={
            isLoaded ? currentCarbonData.data[0].data[0].generationmix : 0
          }
        />
      ) : (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      {isLoaded ? <Map centers={[backendCenter]} /> : null}
      <DataLineChart values={isLoaded ? todayCarbonData : 0} />
    </div>
  );
}

export default Center;
