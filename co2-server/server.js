import express from "express";
import {
  getCenter,
  getCenters,
  createCenter, addUser, getUser, deleteUser, checkUserExists, login,
  deleteCenter,
  updateCenter,
} from "./database.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/api/login", async(req, res) => {
  console.log(req.body)
  const user = await login(req.body.signInEmail, req.body.signInPassword)
  if (!user) {
    console.log("User does not exist!");
    res.status(404);
  }
  else res.status(200);
  res.json({
    user: user,
  })
})

app.post("/api/register", async(req, res) => {
  console.log(req.body)
  const exists = await checkUserExists(req.body.username, req.body.registerEmail)
  console.log(exists);
  if (exists){
    console.log("User with E-Mail adress or Username exists already!")
    res.status(400);
    res.json({
      user: null,
    })
  }
  else{
    const user = await addUser(
      req.body.username,
      req.body.registerEmail,
      req.body.registerPassword
    );
    if (!user) res.status(500);
    else res.status(200);
    res.json({
      user: user,
    })
  }
  // check is create successful -> error message?
});

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
    req.body.CenterName,
    req.body.CenterLocation,
    req.body.CenterPeakConsumption
  );
  res.json({
    center: result,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
})