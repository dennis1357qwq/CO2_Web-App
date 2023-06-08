import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface CenterObj {
  id: number;
  location: string;
  peakConsumption: number;
  name: string;
}

export function Center() {
  const { id } = useParams();
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    id: 0,
    location: "",
    peakConsumption: 0,
    name: "",
  });

  useEffect(() => {
    fetch(`/api/center/${id}`)
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
        <li>peak-Verbrauch: {backendCenter.peakConsumption}</li>
      </div>
      <NavLink to="/dashboard">Home</NavLink>
    </>
  );
}

export default Center;
