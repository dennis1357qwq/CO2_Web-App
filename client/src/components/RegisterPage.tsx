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
    <div className="max-w-m flex flex-col justify-center items-center">
      <form
        id="Register-form"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
        onSubmit={handleRegister}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            placeholder="Enter a Username"
            value={username}
            onChange={(e) => handleRegisterUsernameFieldChange(e)}
          />
        </div>
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
            placeholder="Enter a E-Mail Adress"
            value={registerEmail}
            onChange={(e) => handleRegisterEmailFieldChange(e)}
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
            placeholder="Enter a Password"
            value={registerPassword}
            onChange={(e) => handleRegisterPasswordFieldChange(e)}
          />
        </div>
        <p className="text-red-900">{errorMessage}</p>
        <button
          className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-3 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-l font-medium"
          type="submit"
          disabled={loading}
          onClick={handleRegister}
        >
          Register
        </button>
        <NavLink to="/co2">
          <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Already have an Account?
          </button>
        </NavLink>
      </form>
    </div>
  );
}
