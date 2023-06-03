import { useEffect, useState } from "react";

export function Center(id: number) {
  const [backndData, setBackndData] = useState({});
  fetch("/api/:id")
    .then((response) => response.json())
    .then((data) => {
      setBackndData(data);
    });

  return <>test</>;
}

export default Center;
