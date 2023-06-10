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
      .then((response) => {
        if (response.status == 400) {
          setErrorMessage("Username or E-Mail already in Use!");
          setLoading(false);
        } else if (response.status == 200) {
          setLoading(false);
          navigate("/");
        }
      })
      .then((data) => console.log(data));
    // check for error and print ?
    // success message !
  }

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Enter a Username"
        value={username}
        onChange={(e) => handleRegisterUsernameFieldChange(e)}
      />
      <label htmlFor="email">E-Mail</label>
      <input
        type="email"
        id="email"
        placeholder="Enter a E-Mail Adress"
        value={registerEmail}
        onChange={(e) => handleRegisterEmailFieldChange(e)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter a Password"
        value={registerPassword}
        onChange={(e) => handleRegisterPasswordFieldChange(e)}
      />
      <button type="submit" disabled={loading} onClick={handleRegister}>
        Register
      </button>
      <p className="text-red-900">{errorMessage}</p>
    </form>
  );
}
