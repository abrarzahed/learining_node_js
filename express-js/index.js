const express = require("express");

const app = express();

app.set("view engine", "ejs");

app
  .route("/about/mission")
  .get((req, res) => {
    res.render("index");
  })
  .post((req, res) => {
    res.send("This is home page post");
  })
  .put((req, res) => {
    res.send("This is home page put");
  });

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
