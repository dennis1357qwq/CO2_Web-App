import express from "express";
import { addUser, checkUserExists, login } from "./database.js";
import {
  getCenter,
  getAdress,
  getCenters,
  createCenter,
  deleteCenter,
  updateCenter,
  updateAdress,
} from "./dbCenterQueries.js";
import { getCarbon } from "./CarbonApi.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await login(req.body.signInEmail, req.body.signInPassword);
  if (!user) {
    console.log("User does not exist!");
    res.status(404);
  } else res.status(200);
  res.json({
    user: user,
  });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const exists = await checkUserExists(
    req.body.username,
    req.body.registerEmail
  );
  console.log(exists);
  if (exists) {
    console.log("User with E-Mail adress or Username exists already!");
    res.status(400);
    res.json({
      user: null,
    });
  } else {
    const user = await addUser(
      req.body.username,
      req.body.registerEmail,
      req.body.registerPassword
    );
    if (!user) res.status(500);
    else res.status(200);
    res.json({
      user: user,
    });
  }
  // check is create successful -> error message?
});

app.get("/api", async (req, res) => {
  const centers = await getCenters();
  for (let i = 0; i < centers.length; i++) {
    let adress = await getAdress(centers[i].adress_id);
    const center = centers[i];
    centers[i] = { center, adress };
  }
  res.json({
    centers,
  });
});

app.get("/api/center/:id", async (req, res) => {
  const center = await getCenter(req.params.id);
  if (!center) res.status(404);
  const adress = await getAdress(center.adress_id);
  // const carbon = await getCarbon(center.location);
  res.json({
    center: center,
    adress: adress,
    // carbonData: carbon,
  });
});

app.post("/api/newCenter", async (req, res) => {
  const center = await createCenter(
    req.body.CenterName,
    req.body.CenterPeakConsumption,
    req.body.lat,
    req.body.long,
    req.body.outPost,
    req.body.adress
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
    req.body.CenterName,
    req.body.lattitude,
    req.body.longitude,
    req.outerPostCode,
    req.body.CenterPeakConsumption
  );
  const ad_id = await getCenter(req.body.center_id);
  const upad = await updateAdress(
    ad_id.adress_id,
    req.body.nr,
    req.body.line_1,
    req.body.line_2,
    req.body.city,
    req.body.region,
    req.body.postCode,
    req.body.country
  );
  res.json({
    center: result,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
