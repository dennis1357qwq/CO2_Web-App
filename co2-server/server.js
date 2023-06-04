import express from "express";
import { getCenter, getCenters, createCenter } from "./database.js";
const app = express();

// const centers2 = [
//   { id: 1, location: "there...", peakConsumption: 100000, name: "center 1" },
//   {
//     id: 2,
//     location: "elsewhere...",
//     peakConsumption: 110000,
//     name: "center 2",
//   },
//   { id: 3, location: "there...", peakConsumption: 120000, name: "center 3" },
// ];

app.get("/api", async (req, res) => {
  const centers = await getCenters();
  res.json({
    centers,
  });
});

app.get("/api/center/:id", async (req, res) => {
  const center = await getCenter(req.params.id);
  if (!center) res.status(404);
  res.json({
    center: center,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
