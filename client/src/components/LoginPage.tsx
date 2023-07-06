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
      navigate("/dashboard");
    }
  }

  return (
    <div className="Login-form-wrapper">
      <form className="Login-form" onSubmit={handleSignIn}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your E-Mail Adress"
          value={signInEmail}
          onChange={(e) => handleSignInEmailFieldChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your Password"
          value={signInPassword}
          onChange={(e) => handleSignInPasswordFieldChange(e)}
        />
        <button type="submit" disabled={loading} onClick={handleSignIn}>
          Login
        </button>
        <NavLink to="/register">
          <button className="">Sign Up</button>
        </NavLink>
        <p className="text-red-900">{errorMessage}</p>
      </form>
    </div>
  );
}
