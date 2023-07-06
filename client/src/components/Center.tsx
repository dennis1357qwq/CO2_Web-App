import * as React from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import { EditCenter } from "./EditCenter";
import { UserContext } from "../context/UserContext";

interface CenterObj {
  center_id: number;
  location: string;
  peak_consumption: number;
  name: string;
  affiliated_id: number;
}

export function Center() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [backendCenter, setBackendCenter] = React.useState<CenterObj>({
    center_id: 0,
    location: "",
    peak_consumption: 0,
    name: "",
    affiliated_id: 0,
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

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setBackendCenter(data.center);
      });
  }, []);

  return (
    <div className="Center-wrapper">
      <div className="Center">
        <div className="Center-data-list">
          <li>Name: {backendCenter.name}</li>
          <li>Ort: {backendCenter.location}</li>
          <li>peak-Verbrauch: {backendCenter.peak_consumption}</li>
        </div>

        <div className="Center-buttons">
          <EditCenter
            id={backendCenter.center_id}
            name={backendCenter.name}
            location={backendCenter.location}
            peakCons={backendCenter.peak_consumption}
          />
          <DeleteButton id={backendCenter.center_id} path={path} />
        </div>
        <NavLink className={"Home-Link"} to="/dashboard">
          Home
        </NavLink>
      </div>
    </div>
  );
}

export default Center;
