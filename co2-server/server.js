import express from "express";
import {
  addUser,
  checkUserExists,
  login,
  getScenario,
  getScenarios,
  createScenario,
  deleteScenario,
  updateScenario,
} from "./database.js";
import {
  getCenter,
  getAdress,
  getCenters,
  createCenter,
  deleteCenter,
  updateCenter,
  updateAdress,
} from "./dbCenterQueries.js";
import { getCarbonCurrent, getCarbonNext24 } from "./CarbonApi.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  // console.log(req.body);
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
  // console.log(exists);
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

app.get("/api/:id", async (req, res) => {
  const centers = await getCenters(req.params.id);
  let centerToCarbon = [];
  for (let i = 0; i < centers.length; i++) {
    let adress1 = await getAdress(centers[i].adress_id);
    /*const currentCarbon = await getCarbonCurrent(centers[i].outer_postcode);
    if (currentCarbon == null){
      centerToCarbon.push([centers[i].center_id, 0])
    }
    else{
      console.log(currentCarbon.data[0].data[0].intensity.forecast);
      centerToCarbon.push([centers[i].center_id, currentCarbon.data[0].data[0].intensity.forecast])
    }*/

    const center = centers[i];
    centers[i] = writeCenterObj(center, adress1);
  }
  res.json({
    centers: centers,
  });
});

app.get("/api/center/:id", async (req, res) => {
  const center1 = await getCenter(req.params.id);
  if (!center1) res.status(404);
  if (!center1.adress_id) {
    res.json({
      center: center,
    });
  } else {
    const adress1 = await getAdress(center1.adress_id);
    const center = writeCenterObj(center1, adress1);
    const currentCarbon = await getCarbonCurrent(center.outer_postcode);
    const carbonNext24 = await getCarbonNext24(center.outer_postcode);

    res.json({
      center: center,
      currentCarbon: currentCarbon,
      carbonNext24: carbonNext24,
    });
  }
});

function writeCenterObj(center, adress1) {
  const center_id = center.center_id;
  const name = center.name;
  const peak_consumption = center.peak_consumption;
  const lattitude = center.lattitude;
  const longitude = center.longitude;
  const outer_postcode = center.outer_postcode;
  const unit_number = adress1.unit_number;
  const adress_line_1 = adress1.adress_line_1;
  const adress_line_2 = adress1.adress_line_2;
  const city = adress1.city;
  const region = adress1.region;
  const postal_code = adress1.postal_code;
  const country = adress1.country;
  const adress = {
    unit_number,
    adress_line_1,
    adress_line_2,
    city,
    region,
    postal_code,
    country,
  };

  return {
    center_id,
    name,
    peak_consumption,
    lattitude,
    longitude,
    outer_postcode,
    adress,
  };
}

app.post("/api/newCenter/:id", async (req, res) => {
  const center = await createCenter(
    req.body.CenterName,
    req.body.CenterPeakConsumption,
    req.body.lat,
    req.body.long,
    req.body.outPost,
    req.params.id,
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
    req.body.lat,
    req.body.long,
    req.body.outPost,
    req.body.CenterPeakConsumption
  );
  const ad_id = await getCenter(req.body.center_id);
  const upad = await updateAdress(
    ad_id.adress_id,
    req.body.adress.nr,
    req.body.adress.line_1,
    req.body.adress.line_2,
    req.body.adress.city,
    req.body.adress.region,
    req.body.adress.postCode,
    req.body.adress.country
  );
  res.json({
    center: result,
  });
});

app.get("/api/scenarios/:id", async (req, res) => {
  const result = await getScenarios(req.params.id);
  console.log("current scenarios:");
  console.log(result);
  const scenarios = [];

  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      const cent = [];
      const x = await getScenario(result[i].scenario_id);
      console.log(`scenario in question: `, result[i], `bzw: `, x);
      for (let j = 0; j < x.length; j++) {
        cent.push(await getCenter(x[j].center_id));
      }
      scenarios[i] = writeScenario(x, cent);
    }
  }
  res.json({ scenarios });
});

app.get("/api/scenario/:id", async (req, res) => {
  const data = await getScenario(req.params.id);
  const cen = [];
  const carb = [];
  console.log(`call of method`);
  console.log(`scenario centers:`, data);
  for (let i in data) {
    const akt = await getCenter(data[i].center_id);
    console.log(`center to be added to current scenario: `, akt);
    const currentCarbon = await getCarbonCurrent(akt.outer_postcode);
    cen.push(akt);
    carb.push(currentCarbon);
  }
  const scenario = writeScenario(data, cen, carb);

  res.json({ scenario });
});

function writeScenario(data, cent, carb) {
  console.log(`try to write`);
  console.log(data);
  if (data.length > 0) {
    const scenario_id = data[0].scenario_id;
    const user_id = data[0].user_id;
    const centers = cent;
    const carbon = carb;
    console.log(`written scenario: `, scenario_id, user_id, centers, carbon);

    return {
      scenario_id,
      user_id,
      centers,
      carbon,
    };
  }
}

app.post("/api/newScenario", async (req, res) => {
  const scenario = await createScenario(req.body.user_id, req.body.centers);
  if (!scenario) {
    res.status(404);
  } else {
    console.log(`new scenario:`);
    console.log(scenario);
    res.json({
      scenario: scenario,
    });
  }
});

app.delete("/api/scenario/:id", async (req, res) => {
  const scenarios = await deleteScenario(req.params.id);
  res.json({
    scenarios,
  });
});

app.put("/api/scenario/:id", async (req, res) => {
  const result = await updateScenario(req.body.scenario_id, req.body.centers);
  res.json({
    result,
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
