import express from "express";
import { getCenter, getCenters, createCenter, addUser, getUser, deleteUser, checkUserExists } from "./database.js";
import bodyParser from "body-parser";

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
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

app.post("/api/login", async(req, res) => {
  console.log(req.body)
  const user = await checkUserExists(req.body.signInEmail, req.body.signInPassword)
  if (!user) res.status(404);
  res.json({
    user: user,
  })
})

app.post("/api/register", async(req, res) => {
  console.log(req.body)
  const user = await addUser(
    req.body.username,
    req.body.registerEmail,
    req.body.registerPassword
  );
  // check is create successful -> error message?
  if (!user) res.status(404);
  res.json({
    user: user,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
})