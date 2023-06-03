import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface CenterObj {
  id: number;
  location: string;
  peakConsumption: number;
  name: string;
}

interface CenterStack {
  centers: CenterObj[];
}

export function CenterList() {
  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  return (
    <div className="App">
      {typeof backendCenters.centers === "undefined" ? (
        <div>Loading ...</div>
      ) : (
        backendCenters.centers.map((center: CenterObj, i: number = center.id) =>
          rtValue(center)
        )
      )}
    </div>
  );
}

export default CenterList;

function rtValue(center: CenterObj) {
  return (
    <>
      <NavLink to={`/Center/${center.id}`}>
        <div key={center.id}>{center.name}</div>
      </NavLink>
    </>
  );
}
