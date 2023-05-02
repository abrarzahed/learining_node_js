const express = require("express");

const app = express();

// app.use(
//   express.static(`${__dirname}/public/`, {
//     index: "home.html",
//   })
// );

const router = express.Router({
  caseSensitive: true,
});
app.use(router);

router.get("/about", (req, res) => {
  res.send("This is home page. Express it!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("This is express post request");
});

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
