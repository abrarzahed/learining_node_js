/*
 * Title: Token handlers
 * Description: Token handlers
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { createRandomString } = require("../../helpers/utilities");
const { parsedJSON } = require("../../helpers/utilities");

/* 
  COMMENT: module scaffolding
*/
const handler = {};
handler.tokenHandler = (requestProperties, callBack) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callBack);
  } else {
  }
  callBack(405);
};

handler._token = {};
handler._token.post = (requestProperties, callBack) => {
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
  if (phone && password) {
    data.read("users", phone, (err1, userD) => {
      let hashedPassword = hash(password);
      if (hashedPassword === parsedJSON(userD).password) {
        let tokenID = createRandomString(20);
        let expires = Date.now() + 60 * 60 * 1000;
        let tokenObject = {
          phone,
          id: tokenID,
          expires,
        };
        // store the token in database
        data.create("token", tokenID, tokenObject, (err2) => {
          if (!err1) {
            callBack(200, tokenObject);
          } else {
            callBack(500, {
              error: "Server side error",
            });
          }
        });
      } else {
        callBack(400, {
          error: "Password is not valid",
        });
      }
    });
  } else {
    callBack(400, {
      error: "You have a problem in your request",
    });
  }
};
handler._token.get = (requestProperties, callBack) => {
  // check if token id is valid
  const id =
    typeof requestProperties?.requestProperties?.id === "string" &&
    requestProperties.requestProperties.id.trim().length === 20
      ? requestProperties.requestProperties.id
      : false;
  if (id) {
    data.read("token", id, (err, token) => {
      const tokenObj = { ...parsedJSON(token) };
      if (!err && tokenObj) {
        delete tokenObj.password;
        callBack(200, tokenObj);
      } else {
        callBack(404, {
          error: "Requested token was not found",
        });
      }
    });
  } else {
    callBack(404, {
      error: "Requested token was not found",
    });
  }
};
handler._token.put = (requestProperties, callBack) => {};
handler._token.delete = (requestProperties, callBack) => {};

module.exports = handler;
