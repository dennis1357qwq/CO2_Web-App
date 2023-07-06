import express, { response } from "express";
import {
  getCenter,
  getCenters,
  createCenter,
  addUser,
  getUser,
  deleteUser,
  checkUserExists,
  login,
  deleteCenter,
  updateCenter,
} from "./database.js";
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

app.post("/api", async (req, res) => {
  // console.log(req.body.user_id)
  const centers = await getCenters(Number(req.body.user_id));
  res.json({
    centers,
  });
});

app.get("/api/center/:id", async (req, res) => {
  const center = await getCenter(req.params.id);
  if (!center) res.status(404);
  const carbon = await getCarbon(center.location);
  res.json({
    center: center,
    carbonData: carbon,
  });
});

app.post("/api/newCenter", async (req, res) => {
  const center = await createCenter(
    req.body.CenterName,
    req.body.CenterLocation,
    req.body.CenterPeakConsumption,
    req.body.user_id
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
    req.body.CenterLocation,
    req.body.CenterPeakConsumption
  );
  res.json({
    center: result,
  });
});

async function getCarbon(postCode) {
  const headers = {
    Accept: "application/json",
  };

  try {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/postcode/${postCode}`,
      {
        method: "GET",

        headers: headers,
      }
    );

    const result = await response.json();
    return result;
  } catch {
    console.log("error");
  }

  // .then(function (res) {
  //   return res.json();
  // })
  // .then((body) => {
  //   return body;
  // });
}

app.listen(5002, () => {
  console.log("server started on port 5002");
});
