import * as React from "react";
import { useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CenterObj, CenterStack } from "./CenterInterface";
import { Map } from "./Map";

export function CenterList() {
  const userContext = useContext(UserContext);
  const { id } = useParams();
  // console.log(userContext.user);
  const path = `/api/${id}`;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
      });
  }, []);

  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });

  return (
    <div className="CenterListWrapper">
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
      <Map points={backendCenters.centers} spawn={[]} showAdress={false}></Map>
    </div>
  );
}

export default CenterList;
