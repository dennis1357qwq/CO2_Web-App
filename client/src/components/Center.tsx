import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
        <li>peak-Verbrauch: {backendCenter.peak_consumption}</li>
      </div>
      <NavLink to="/">Home</NavLink>
    </>
  );
}

export default Center;
