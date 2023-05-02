const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is home page. Express it!");
});

app.post("/", (req, res) => {
  res.send("This is express post request");
});

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
