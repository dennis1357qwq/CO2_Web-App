import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CenterList from "./CenterList";
import { UserContext } from "../context/UserContext";
import { LogoutButton } from "./LogoutButton";

export const Overview = () => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  // console.log(userContext.authenticated);

  useEffect(() => {
    // Check im localStorage ob loggedIn gesetzt wurde
    async function checkLoggedIn() {
      const loggedIn = localStorage.getItem("status");
      // console.log(loggedIn);
      if (loggedIn) {
        const username = localStorage.getItem("username");
        const user_id = Number(localStorage.getItem("user_id"));
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

  if (!userContext.authenticated) {
    return null;
  }
  return (
    <div className="Overview">
      <h1>
        Logged in as user: {userContext?.user?.username ?? "ERROR"} with Id:{" "}
        {userContext?.user?.user_id}
      </h1>
      <CenterList />
      <NavLink to="/newCenter">
        <button id="AddButton">+</button>
      </NavLink>
      <LogoutButton />
    </div>
  );
};
