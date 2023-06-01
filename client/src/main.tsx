import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./components/LoginPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);
