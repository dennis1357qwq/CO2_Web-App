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

export function Center() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [carbonData, setCarbonData] = useState<any>({});
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
        setCarbonData(data.carbon);
        setIsLoaded(true);
      });
  }, []);

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
        <DataPieChart values={carbonData.data[0].data[0].generationmix} />
      ) : (
        // Loading animation vielleicht anders setzen?
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      <Map centers={[backendCenter]} />
    </div>
  );
}

export default Center;
