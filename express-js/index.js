const express = require("express");
const handle = require("./handles");

const app = express();
const admin = express();

app.use("/admin", admin);

// app.locals.title = "My App";

// app.use(
//   express.static(`${__dirname}/public/`, {
//     index: "home.html",
//   })
// );

// const router = express.Router({
//   caseSensitive: true,
// });
// app.use(router);

// admin.on("mount", function (parent) {
//   console.log("Admin Mounted");
//   console.log(parent); // refers to the parent app
// });

admin.get("/dashboard", (req, res) => {
  console.log(admin.mountpath);
  res.send("welcome to dashboard");
});
app.get("/", (req, res) => {
  console.log("Welcome to homepage");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("This is express post request");
});

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
