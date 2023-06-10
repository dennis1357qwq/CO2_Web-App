import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";

interface CenterObj {
  center_id: number;
  location: string;
  peak_consumption: number;
  name: string;
}

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
    <>
      <div>
        <li>Name: {backendCenter.name}</li>
        <li>Ort: {backendCenter.location}</li>
        <li>peak-Verbrauch: {backendCenter.peak_consumption}</li>
      </div>

      <EditCenter
        id={backendCenter.center_id}
        name={backendCenter.name}
        location={backendCenter.location}
        peakCons={backendCenter.peak_consumption}
      />
      <DeleteButton id={backendCenter.center_id} path={path} />
      <NavLink to="/">Home</NavLink>
    </>
  );
}

export default Center;
