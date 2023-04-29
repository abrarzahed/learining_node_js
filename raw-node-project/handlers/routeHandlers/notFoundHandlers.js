/*
 * Title: Not found handlers
 * Description: 404 not found handlers
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: module scaffolding
*/
const handler = {};
handler.notFoundHandler = (requestProperties, callBack) => {
  console.log(requestProperties);
  callBack(404, {
    message: "Page not found",
  });
};

module.exports = handler;
