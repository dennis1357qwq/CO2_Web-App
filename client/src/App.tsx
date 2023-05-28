import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backndData, setBackndData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackndData(data);
      });
  }, []);

  return (
    <div className="App">
      test
      <div style={{ background: "red" }}>test red</div>
    </div>
  );
}

export default App;
