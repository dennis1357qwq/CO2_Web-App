import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";
import { Map } from "./Map";
import { CenterObj } from "./CenterInterface";
import LoginPage from "./LoginPage";

export function Center() {
  const { id } = useParams();
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    name: "",
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

  const path = `/api/center/${id}`;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenter(data.center);
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
            lattitude={backendCenter.lattitude}
            longitude={backendCenter.longitude}
            outer_postcode={backendCenter.outer_postcode}
            adress={backendCenter.adress}
          />
          <DeleteButton id={backendCenter.center_id} path={path} />
        </div>
        <NavLink className={"Home-Link"} to="/dashboard">
          Home
        </NavLink>
      </div>
      <Map centers={[backendCenter]} />
    </div>
  );
}

export default Center;
