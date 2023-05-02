const express = require("express");
const handle = require("./handles");

const app = express();

app.all("/", (req, res) => {
  console.log("Welcome to homepage");
  res.send("This is home page");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("This is express post request");
});

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
