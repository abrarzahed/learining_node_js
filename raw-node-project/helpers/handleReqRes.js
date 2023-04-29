/*
 * Title: handle request & response
 * Description: handle request and response
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const { StringDecoder } = require("string_decoder");
const url = require("url");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandlers");
const { parsedJSON } = require("../helpers/utilities");

/* 
  COMMENT: module scaffolding
*/
const handler = {};

handler.resReq = (req, res) => {
  // request handling
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|$/g, "");
  const method = req.method.toLowerCase();
  const queryString = parsedUrl.query;
  const headers = req.headers;

  // request properties
  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryString,
    headers,
  };

  const decoder = new StringDecoder("utf8");
  let realData = "";

  // chosen handler
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};

    const payloadString = JSON.stringify(payload);

    //  return the final response
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    requestProperties.body = parsedJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      //  return the final response
      // res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
    // response handle
    res.end(realData);
  });
};

module.exports = handler;
