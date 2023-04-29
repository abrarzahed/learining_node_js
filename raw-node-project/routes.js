/*
 * Title: Routes
 * Description: Application routes
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const { sampleHandler } = require("./handlers/routeHandlers/samlpeHandlers");

/* 
  COMMENT: module scaffolding
*/
const routes = {
  sample: sampleHandler,
};

module.exports = routes;
