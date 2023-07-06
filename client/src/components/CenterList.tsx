import * as React from "react";
import { useEffect, useContext } from "react";
import { NavLink, redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface CenterObj {
  center_id: number;
  location: string;
  peak_consumption: number;
  name: string;
}

interface CenterStack {
  centers: CenterObj[];
}

export function CenterList() {
  const userContext = useContext(UserContext);
  // console.log(userContext.user);

  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userContext.user),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });

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
