import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CenterList from "./CenterList";
import { UserContext } from "../context/UserContext";

export const Overview = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="Overview">
      <h1>
        Logged in as: {userContext?.user?.username ?? "ERROR"} with Id:{" "}
        {userContext?.user?.user_id}
      </h1>
      <CenterList />
      <NavLink to="/newCenter">
        <button id="AddButton">+</button>
      </NavLink>
    </div>
  );
};
