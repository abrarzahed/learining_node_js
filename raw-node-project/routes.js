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

/* 
  COMMENT: module scaffolding
*/
const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
