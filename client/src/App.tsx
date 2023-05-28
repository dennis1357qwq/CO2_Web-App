import { useEffect, useState } from "react";
import "./App.css";

let centers: String[];

function App() {
  const [backndData, setBackndData] = useState({ centers });

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackndData(data);
      });
  }, []);

  return (
    <div className="App">
      {typeof backndData.centers === "undefined" ? (
        <p>Loading ...</p>
      ) : (
        backndData.centers.map((center: any, i: any) => (
          <p key={i}>{center} </p>
        ))
      )}
    </div>
  );
}

export default App;
