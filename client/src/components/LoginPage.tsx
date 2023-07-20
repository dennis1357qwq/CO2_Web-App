import {
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useContext,
} from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const userContext = useContext(UserContext);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSignInEmailFieldChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSignInEmail(event.target.value);
  }

  function handleSignInPasswordFieldChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setSignInPassword(event.target.value);
  }

  async function handleSignIn(event: any) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const user = { signInEmail, signInPassword };

    const response = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.status == 404) {
      setLoading(false);
      setErrorMessage("Credentials are wrong / User does not exist!");
    } else if (response.status == 200) {
      setLoading(false);
      const { username, user_id } = (await response.json()).user;
      // Bei erfolgreicher Anmeldung: User setzen
      userContext.setUser({
        username,
        user_id,
      });

      userContext.setAuthenticated(true);
      // LocalStorage to remember when reloading page
      localStorage.setItem("status", "loggedIn");
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", user_id);
      navigate(`/co2/dashboard/${user_id}`);
    }
  }

  return (
    <div className="max-w-m flex flex-col justify-center items-center">
      <form
        id="Login-form"
        className="min-w-[35%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
        onSubmit={handleSignIn}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-Mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="Enter your E-Mail Adress"
            value={signInEmail}
            onChange={(e) => handleSignInEmailFieldChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={signInPassword}
            onChange={(e) => handleSignInPasswordFieldChange(e)}
          />
        </div>
        <p className="text-red-900">{errorMessage}</p>
        <button
          className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
          type="submit"
          disabled={loading}
          onClick={handleSignIn}
        >
          Login
        </button>
        <NavLink to="/co2/register">
          <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Need an Account?
          </button>
        </NavLink>
      </form>
    </div>
  );
}
