import express from "express";
import {
  getCenter,
  getCenters,
  createCenter,
  deleteCenter,
  updateCenter,
} from "./database.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

app.post("/api/newCenter", async (req, res) => {
  const center = await createCenter(
    req.body.CenterName,
    req.body.CenterLocation,
    req.body.CenterPeakConsumption
  );
  if (!center) res.status(404);
  res.json({
    center: center,
  });
});

app.delete("/api/center/:id", async (req, res) => {
  const centers = await deleteCenter(req.params.id);
  res.json({
    centers,
  });
});

app.put("/api/center/:id", async (req, res) => {
  const result = await updateCenter(
    req.body.center_id,
    req.body.name,
    req.body.location,
    req.body.peak_consumption
  );
  res.json({
    center: result,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
