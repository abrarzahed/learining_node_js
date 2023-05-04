const express = require("express");
const cookieParser = require("cookie-parser");
const handler = require("./handles");

const app = express();

app.use(express.json());
// app.use(cookieParser());

const adminRoute = express.Router();

adminRoute.get("/dashboard", (req, res) => {
  // console.log(req.originalUrl);
  // console.log(req.url);
  // console.log(req.path);
  // console.log(req.hostname);
  // console.log(req.ip);
  // console.log(req.method);
  // console.log(req.protocol);
  // console.log(req.params);
  console.log(req.query);
  res.send("We are in admin dashboard");
});

app.use("/admin", adminRoute);

// app.get("/users/:id", (req, res) => {
//   // console.log(req.originalUrl);
//   // console.log(req.url);
//   // console.log(req.path);
//   // console.log(req.hostname);
//   // console.log(req.ip);
//   // console.log(req.method);
//   // console.log(req.protocol);
//   // console.log(req.params);
//   // console.log(req.query);
//   // console.log(req.cookies);
//   // console.log(req.secure);
//   res.send("This is home page post");
// });

app.get("/users/:id", handler);

// app.put((req, res) => {
//   res.send("This is home page put");
// });

app.post("/users/", (req, res) => {
  console.log(req.route);
  res.send("This is home page POST");
});

app.listen(3000, () => {
  console.log("express app is running on port 3000");
});
