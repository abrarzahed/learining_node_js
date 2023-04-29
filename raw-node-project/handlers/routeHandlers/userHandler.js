/*
 * Title: user handlers
 * Description: user handlers
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");

/* 
  COMMENT: module scaffolding
*/
const handler = {};
handler.userHandler = (requestProperties, callBack) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callBack);
  } else {
  }
  callBack(405);
};

handler._users = {};
handler._users.post = (requestProperties, callBack) => {
  const firstName =
    typeof requestProperties?.body?.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties?.body?.lastName === "string" &&
    requestProperties?.body?.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties?.body?.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties?.body?.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const termsAgreement =
    typeof requestProperties?.body?.termsAgreement === "boolean"
      ? requestProperties.body.termsAgreement
      : false;

  if (firstName && lastName && phone && password && termsAgreement) {
    // make sure that the user does not already exist
    data.read("users", phone, (err, user) => {
      if (err) {
        let userObj = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          termsAgreement,
        };
        // store the user to database
        data.create("users", phone, userObj, (err) => {
          if (!err) {
            callBack(200, {
              message: "User was created successfully",
            });
          } else {
            callBack(500, {
              error: "Could not create user",
            });
          }
        });
      } else {
        callBack(500, {
          error: "There was an error in server side",
        });
      }
    });
  } else {
    callBack(400, {
      error: "There was an error in your request",
    });
  }
};
handler._users.get = (requestProperties, callBack) => {};
handler._users.put = (requestProperties, callBack) => {};
handler._users.delete = (requestProperties, callBack) => {};

module.exports = handler;
