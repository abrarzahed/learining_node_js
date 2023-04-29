const http = require("http");

// create server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`<html>
                 <head>
                   <title>Form</title>
                 </head>
                 <body>
                  <form method="post" action="/process">
                     <input name="message"/>
                  </form>
                 </body>
              </html>`);
    res.end();
  } else if (req.url === "/process" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      console.log("streaming finished");
      const bufferedBody = Buffer.concat(body).toString();
      // console.log(bufferedBody);
      res.write(`<h1>${bufferedBody}</h1>`);
      res.end();
    });
  } else {
    res.write("Page not found!");
    res.end();
  }
});

server.listen(3000);
console.log("listening on port 3000");

// const fs = require("fs");
// const ourReadStream = fs.createReadStream(`${__dirname}/bigData.txt`);
// ourReadStream.on("data", (chunk) => {
//   console.log(chunk);
// });

// console.log("Hello");
