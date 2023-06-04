import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface CenterObj {
  center_id: number;
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
        backendCenters.centers.map(
          (center: CenterObj, i: number = center.center_id) => (
            <NavLink key={i} to={`/center/${center.center_id}`}>
              <p key={center.center_id}>{center.name}</p>
            </NavLink>
          )
        )
      )}
    </div>
  );
}

export default CenterList;
