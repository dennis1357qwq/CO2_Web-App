import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const userContext = useContext(UserContext);

export function LogoutButton() {
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    e.preventDefault();
    // set user to null:
    userContext.setUser(null);
    navigate("/");

    return (
      <>
        <button onClick={handleClick}>Logout</button>
      </>
    );
  };
}
