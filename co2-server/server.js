const express = require("express");
const app = express();

const centers = ["center 1", "center 2", "center 3", "center 4", "center 5"];

app.get("/api", (req, res) => {
  res.json({
    centers,
  });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
