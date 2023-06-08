import { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
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

  async function handleSignIn(event: SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Sign in Logic here
      navigate("/dashboard");
      setErrorMessage("E-Mail or Password is wrong!");
      setLoading(false);
    } catch (err) {
      setErrorMessage("There was an error signing in!");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="">
        <label htmlFor="email" className="">
          E-Mail
        </label>
        <div className="">
          <input
            type="email"
            id="email"
            className=""
            placeholder="Enter your E-Mail Adress"
            value={signInEmail}
            //onClick={(event) => console.log(event)}
            onChange={(e) => handleSignInEmailFieldChange(e)}
          />
        </div>
        <label htmlFor="password" className="">
          Password
        </label>
        <div className="">
          <input
            type="password"
            id="password"
            className=""
            placeholder="Enter your Password"
            value={signInPassword}
            //onClick={(event) => console.log(event)}
            onChange={(e) => handleSignInPasswordFieldChange(e)}
          />
        </div>
        <button className="" disabled={loading} onClick={handleSignIn}>
          Login
        </button>{" "}
        &nbsp; &nbsp;
        <NavLink to="/register">
          <button className="">Sign Up</button>
        </NavLink>
        <p className="text-red-900">{errorMessage}</p>
      </div>
    </div>
  );
}
