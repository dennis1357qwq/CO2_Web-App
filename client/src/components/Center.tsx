import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";
import { Map } from "./Map";
import { CenterObj } from "./CenterInterface";

export function Center() {
  const { id } = useParams();
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    location: "",
    peak_consumption: 0,
    name: "",
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
          <li>Ort: {backendCenter.location}</li>
          <li>peak-Verbrauch: {backendCenter.peak_consumption}</li>
        </div>

        <div className="Center-buttons">
          <EditCenter
            id={backendCenter.center_id}
            name={backendCenter.name}
            location={backendCenter.location}
            peakCons={backendCenter.peak_consumption}
          />
          <DeleteButton id={backendCenter.center_id} path={path} />
        </div>
        <NavLink className={"Home-Link"} to="/dashboard">
          Home
        </NavLink>
      </div>
      <Map />
    </div>
  );
}

export default Center;
