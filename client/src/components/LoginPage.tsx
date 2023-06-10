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

  async function handleSignIn(event: any) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const user = { signInEmail, signInPassword };

    fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((repsonse) => {
        if (repsonse.status == 404) {
          setErrorMessage("Credentials are wrong / User does not exist!");
          // setAuth ?? accessToken
          setLoading(false);
        } else if (repsonse.status == 200) {
          navigate("/dashboard");
          setLoading(false);
        }
      })
      .then((data) => console.log(data));
  }

  return (
    <form onSubmit={handleSignIn}>
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
  );
}
