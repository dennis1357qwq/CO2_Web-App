import * as React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CenterObj } from "./CenterInterface";

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
            <div key={i}>
              <NavLink key={i} to={`/center/${center.center_id}`}>
                <p key={center.center_id}>{center.name}</p>
              </NavLink>
            </div>
          )
        )
      )}
    </div>
  );
}

export default CenterList;
