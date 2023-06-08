import express from "express";
import { getCenter, getCenters, createCenter } from "./database.js";
const app = express();

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
