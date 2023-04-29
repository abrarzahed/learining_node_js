const http = require("http");
const fs = require("fs");

// create server
const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream(`${__dirname}/bigData.txt`, "utf8");
  readStream.pipe(res);
});

server.listen(3000);
console.log("listening on port 3000");
