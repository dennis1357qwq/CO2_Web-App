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
        <Route path="/co2" element={<LoginPage />} />
        <Route path="/co2/dashboard/:id" element={<Overview />} />
        <Route path="/co2/register" element={<RegisterPage />} />
        <Route path="/co2/center/:id" element={<Center />} />
        <Route path="/co2/newCenter/:id" element={<AddCenterForm />} />
        <Route path="*" element={<LoginPage />} />

        <Route path="/co2/newScenario" element={<AddScenarioForm />} />
        <Route path="/co2/scenario/:id" element={<Scenario />} />
      </Routes>
    </>
  );
}

export default App;
