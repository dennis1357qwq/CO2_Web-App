const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ centers: ["center 1", "center 2", "center 3", "center 4"] });
});

app.listen(5002, () => {
  console.log("server started on port 5002");
});
