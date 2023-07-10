import "./App.css";
import "./components/CenterList";
import CenterList from "./components/CenterList";
import Center from "./components/Center";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import { AddCenterForm } from "./components/AddCenterForm";
import { Overview } from "./components/Overview";
import { EditCenter } from "./components/EditCenter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/:id" element={<Overview />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/center/:id" element={<Center />} />
        <Route path="/newCenter/:id" element={<AddCenterForm />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </>
  );
}

export default App;
