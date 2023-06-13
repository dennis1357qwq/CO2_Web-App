import { NavLink } from "react-router-dom";
import CenterList from "./CenterList";

export const Overview: any = () => {
  return (
    <div className="Overview">
      <CenterList />
      <NavLink to="/newCenter">
        <button id="AddButton">+</button>
      </NavLink>
    </div>
  );
};
