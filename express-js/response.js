const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  //   res.send("About Page");
  console.log(res.headersSent);
  res.render("pages/about", {
    country: "Bangladesh",
  });
  console.log(res.headersSent);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
