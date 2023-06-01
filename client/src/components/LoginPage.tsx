import { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("E-Mail or Password is wrong!");
      setLoading(false);
    } catch (err) {
      setErrorMessage("There was an error signing in!");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="lg:w-2/5 md:w-3/5 w-4/5">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-8 text-gray-900"
        >
          E-Mail
        </label>
        <div className="relative mt-2 rounded-md shadow-lg">
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your E-Mail Adress"
            value={signInEmail}
            //onClick={(event) => console.log(event)}
            onChange={(e) => handleSignInEmailFieldChange(e)}
          />
        </div>

        <label
          htmlFor="password"
          className="block text-sm font-medium leading-8 text-gray-900"
        >
          Password
        </label>
        <div className="relative mt-2 rounded-md shadow-lg">
          <input
            type="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your Password"
            value={signInPassword}
            //onClick={(event) => console.log(event)}
            onChange={(e) => handleSignInPasswordFieldChange(e)}
          />
        </div>

        <button
          className={`
            bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-indigo-600 hover:text-white shadow-m
            ${loading ? "bg-indigo-600 text-white animate-pulse" : ""}
          `}
          disabled={loading}
          onClick={handleSignIn}
        >
          Sign in
        </button>
        <p className="text-red-900">{errorMessage}</p>
      </div>
    </div>
  );
}
