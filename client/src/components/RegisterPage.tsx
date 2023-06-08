import { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleRegisterUsernameFieldChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setUsername(event.target.value);
  }

  function handleRegisterEmailFieldChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setRegisterEmail(event.target.value);
  }

  function handleRegisterPasswordFieldChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setRegisterPassword(event.target.value);
  }

  async function handleRegister(event: any) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const user = { username, registerEmail, registerPassword };

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // check for error and print ?

    setLoading(false);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="">
        <label htmlFor="username" className="">
          Username
        </label>
        <div className="">
          <input
            type="username"
            id="username"
            className=""
            placeholder="Enter a username"
            value={username}
            onChange={(e) => handleRegisterUsernameFieldChange(e)}
          ></input>
        </div>
        <label htmlFor="email" className="">
          E-Mail
        </label>
        <div className="">
          <input
            type="email"
            id="email"
            className=""
            placeholder="Enter your E-Mail Adress"
            value={registerEmail}
            onChange={(e) => handleRegisterEmailFieldChange(e)}
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
            placeholder="Enter a Password"
            value={registerPassword}
            onChange={(e) => handleRegisterPasswordFieldChange(e)}
          />
        </div>

        <button className="" disabled={loading} onClick={handleRegister}>
          Register
        </button>
        <p className="text-red-900">{errorMessage}</p>
      </div>
    </div>
  );
}
