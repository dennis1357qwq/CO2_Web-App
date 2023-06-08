import { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import "./LoginPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleRegister(event: SyntheticEvent) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Register Logic here
      setErrorMessage("E-Mail adress or username already in use!");
      setLoading(false);
    } catch (err) {
      setErrorMessage("There was an error while register!");
      setLoading(false);
    }
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
            //onClick={(event) => console.log(event)}
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
            //onClick={(event) => console.log(event)}
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
