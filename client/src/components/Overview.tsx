import { NavLink } from "react-router-dom";
import CenterList from "./CenterList";

export const Overview: any = () => {
  return (
    <div>
      <CenterList />
      <NavLink to="/newCenter">+</NavLink>
    </div>
  );
};
