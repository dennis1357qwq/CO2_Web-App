import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CenterObj, CenterStack } from "./CenterInterface";
import { Map } from "./Map";

export function CenterList() {
  const userContext = useContext(UserContext);
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const path = `/api/${id}`;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenters(data);
        setIsLoaded(true);
      });
  }, []);

  const [backendCenters, setBackendCenters] = React.useState<CenterStack>({
    centers: [],
  });
  const [centerToCarbon, setCenterToCarbon] = React.useState();

  return (
    <div className="CenterListWrapper">
      <Map points={backendCenters.centers} spawn={[]} showAdress={false}></Map>

      <div className="grid grid-cols-1 place-items-center gap-5 pt-5">
        {typeof backendCenters.centers === "undefined" ? (
          <div>Loading...</div>
        ) : (
          backendCenters.centers.map(
            (center: CenterObj, i: number = center.center_id) => (
              <div
                className="block min-w-[30%] max-w-l p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={i}
              >
                <NavLink key={i} to={`/center/${center.center_id}`}>
                  <h5 className="mb-2 w-40 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {center.name}
                  </h5>
                  {/* <p className="font-normal text-gray-700 dark:text-gray-400"> 
                    Current Carbon Intensity:
                  </p>*/}
                </NavLink>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default CenterList;
