/*
 * Title: Routes
 * Description: Application routes
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const { sampleHandler } = require("./handlers/routeHandlers/samlpeHandlers");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");

/* 
  COMMENT: module scaffolding
*/
const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
