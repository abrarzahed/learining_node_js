const express = require("express");

const app = express();

app.set("view engine", "ejs");

/*
app.get("/about", (req, res) => {
  //   res.send("About Page");
  console.log(res.headersSent);
  res.render("pages/about", {
    country: "Bangladesh",
  });
  console.log(res.headersSent);
});
*/

/*
app.get("/about", (req, res) => {
  res.send(data);
  res.end(data);
  res.json({ name: "Abrar", age: 20 });
  res.sendStatus(404);
});
*/

/* 
  COMMENT: res.format()
*/
/*
app.get("/about", (req, res) => {
  res.format({
    "text/plain": () => {
      res.send("Hi plain text");
    },
    "text/html": () => {
      res.render("pages/about", {
        country: "Bangladesh",
      });
    },
    "application/json": () => {
      res.json({
        message: "About",
      });
    },
    default: () => {
      res.status(406).send("Not acceptable");
    },
  });
});
*/

/* 
  COMMENT: res.cookies
*/
app.get("/test", (req, res) => {
  res.send("TEST route");
});

/*
app.get("/about", (req, res) => {
  res.cookie("name", "ABRARHUSSENZAHED");
  res.location("/test");
  res.redirect("/test");
  res.end();
});
*/

app.get("/about", (req, res) => {
  res.set("Title", "LWS Node");
  console.log(res.get("Title"));
  res.end();
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
