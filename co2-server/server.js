const express = require("express");
const app = express();

const centers = [
  { id: 1, location: "there...", peakConsumption: 100000, name: "center 1" },
  {
    id: 2,
    location: "elsewhere...",
    peakConsumption: 110000,
    name: "center 2",
  },
  { id: 3, location: "there...", peakConsumption: 120000, name: "center 3" },
];

app.get("/api", (req, res) => {
  res.json({
    centers,
  });
});

app.get("/api/center/:id", (req, res) => {
  const center = centers.find((c) => c.id === parseInt(req.params.id));
  if (!center) res.status(404);
  res.json({
    center: center,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
