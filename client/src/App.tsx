import "./App.css";
import "./components/CenterList";
import CenterList from "./components/CenterList";
import Center from "./components/Center";
import { Route, Routes } from "react-router-dom";
import { AddCenterForm } from "./components/AddCenterForm";
import { Overview } from "./components/Overview";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/center/:id" element={<Center />} />
        <Route path="/newCenter" element={<AddCenterForm />} />
      </Routes>
    </>
  );
}

export default App;
