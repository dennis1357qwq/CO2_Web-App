import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";
import { UserContext } from "../context/UserContext";
import { Map } from "./Map";
import { CenterObj } from "./CenterInterface";
import "./Center.css";
import DataPieChart from "./PieChart";
import DataLineChart from "./LineChart";
import { CenterHeader } from "./CenterHeader";

export function Center() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCarbonData, setCurrentCarbonData] = useState<any>({});
  const [carbonDataNext24, setCarbonDataNext24] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    name: "",
    user_id: 0,
    peak_consumption: 0,
    lattitude: 0,
    longitude: 0,
    outer_postcode: "",
    adress: {
      unit_number: "",
      adress_line_1: "",
      adress_line_2: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
    },
  });

  // check for logged in !!
  useEffect(() => {
    // Check of authenticated, wenn nicht localstorage, wenn nicht zum login
    async function checkLoggedIn() {
      if (userContext.authenticated) {
        return null;
      }
      const loggedIn = localStorage.getItem("status");
      // console.log(loggedIn);
      if (loggedIn) {
        const username = localStorage.getItem("username");
        const user_id = Number(localStorage.getItem("user_id"));
        // console.log(user_id);
        await userContext.setUser({
          username,
          user_id,
        });

        await userContext.setAuthenticated(true);
      } else {
        navigate("/");
      }
    }
    checkLoggedIn();
  }, []);

  const path = `/api/center/${id}`;
  const user_id = userContext.user?.user_id;

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenter(data.center);
        setCurrentCarbonData(data.currentCarbon);
        setCarbonDataNext24(data.carbonNext24);
        setIsLoaded(true);
      });
  }, []);

  // console.log(carbonDataNext24);

  return (
    <>
      {isLoaded ? (
        <div className="Center-Wrapper">
          <div className="Center">
            <CenterHeader
              center={backendCenter}
              path={path}
              user_id={user_id}
            />
            <div>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                CURRENT CARBON INTENSITY:
              </p>
              {currentCarbonData ? (
                <p className="text-3xl font-medium">
                  {currentCarbonData.data[0].data[0].intensity.forecast} gCO
                  <sub>2</sub>/kWH
                </p>
              ) : (
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  ERROR
                </p>
              )}
            </div>
            <div className="row-wrapper">
              {currentCarbonData ? (
                <div className="pie-wrapper">
                  <DataPieChart
                    values={currentCarbonData.data[0].data[0].generationmix}
                  />
                </div>
              ) : (
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  ERROR
                </p>
              )}

              <div className="Map-Wrapper">
                <div className="MapSt">
                  <Map
                    points={[backendCenter]}
                    spawn={[
                      backendCenter.lattitude,
                      backendCenter.longitude,
                      13,
                    ]}
                    showAdress={true}
                  />
                </div>
              </div>
            </div>
            <div className="row-wrapper">
              {currentCarbonData ? (
                <div className="text-xl font-medium text-gray-500 breaknormal">
                  With a peak energy consumption of{" "}
                  {backendCenter.peak_consumption} kW, your center located in{" "}
                  {backendCenter.adress.city} will have a carbon intensity of
                  approx.{" "}
                  {+currentCarbonData.data[0].data[0].intensity.forecast *
                    +backendCenter.peak_consumption}{" "}
                  gCO<sub>2</sub>/h
                </div>
              ) : (
                <div className="text-xl font-medium text-gray-500">
                  There was an error while fetching the carbon data! Try again
                  in a Minute.
                </div>
              )}
            </div>
            <div className="row-wrapper">
              <div className="Charts-Wrapper">
                <p className="text-2xl font-bold mb-6">
                  Carbon Intensity Forecast (24h):
                </p>
                {carbonDataNext24 ? (
                  <DataLineChart values={carbonDataNext24} />
                ) : (
                  <div className="bg-red-100 border border-red-400 test-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">
                      There was an error while fetching the carbon data! Try
                      again in a Minute.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default Center;
