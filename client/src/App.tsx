import "./App.css";
import "./components/CenterList";
import CenterList from "./components/CenterList";
import Center from "./components/Center";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CenterList />} />
        <Route path="/center/:id" element={<Center />} />
      </Routes>
    </>
  );
}

export default App;
