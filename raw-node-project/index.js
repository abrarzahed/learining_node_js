/* 
  COMMENT: app info
*/
/*
 * Title: Uptime Monitoring app
 * Description: A raw nodejs api project to monitor up and down time of user defined link
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: Dependencies
*/
const http = require("http");
const { resReq } = require("./helpers/handleReqRes");
const environment = require("./helpers/environmet");
const data = require("./lib/data");

/* 
  COMMENT: app object - module scaffolding
*/
const app = {};

// testing file system
// TODO: will remove latter
// data.delete("test", "newFile", (err, data) => {
//   console.log(err, data);
// });

/* 
  COMMENT: create server
*/
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Environment variable is ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${environment.port}`);
  });
};

/* 
  COMMENT: handle request and response
*/
app.handleReqRes = resReq;

/* 
  COMMENT: start the server
*/
app.createServer();
