import "./App.css";
import "./components/CenterList";
import CenterList from "./components/CenterList";
import Center from "./components/Center";
import Scenario from "./components/Scenario";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import { AddCenterForm } from "./components/AddCenterForm";
import { AddScenarioForm } from "./components/AddScenarioForm";
import { Overview } from "./components/Overview";
import { EditCenter } from "./components/EditCenter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/:id" element={<Overview />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/center/:id" element={<Center />} />
        <Route path="/newCenter/:id" element={<AddCenterForm />} />
        <Route path="*" element={<Overview />} />

        <Route path="/newScenario" element={<AddScenarioForm />} />
        <Route path="/scenario/:id" element={<Scenario />} />
      </Routes>
    </>
  );
}

export default App;
