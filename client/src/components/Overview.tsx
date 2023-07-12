import { useContext, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CenterList from "./CenterList";
import ScenarioList from "./ScenarioList";
import { UserContext } from "../context/UserContext";

export const Overview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  //console.log(userContext.authenticated);

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

  if (!userContext.authenticated) {
    return null;
  }

  return (
    <div className="Overview">
      <CenterList />

      <ScenarioList />
    </div>
  );
};
