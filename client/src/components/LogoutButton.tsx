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
      <button
        className="border border-red-500 bg-red-500 text-white rounded-md px-2 py-1 m-2 transition duration-500 ease select-none hover:bg-red-800 focus:outline-none focus:shadow-outline text-sm font-medium"
        onClick={handleClick}
      >
        Logout
      </button>
    </>
  );
}
