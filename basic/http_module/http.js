const http = require("http");

// create server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello programmers");
    res.write(" How have you been?");
    res.end();
  } else if (req.url === "/about") {
    res.write("This is about us page");
    res.end();
  } else {
    res.write("Page not found!");
    res.end();
  }
});

// server.on("connection", () => {
//   console.log("New connection...");
// });
server.listen(3000);
console.log("listening on port 3000");
