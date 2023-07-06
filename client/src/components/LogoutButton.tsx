import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export function LogoutButton() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    e.preventDefault();
    // set user to null:
    userContext.setUser(null);
    userContext.setAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}
