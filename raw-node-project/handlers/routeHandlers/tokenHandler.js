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
    typeof requestProperties?.id === "string" &&
    requestProperties.id.trim().length === 20
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
handler._token.put = (requestProperties, callBack) => {
  // check if token id is valid
  const id =
    typeof requestProperties?.body?.id === "string" &&
    requestProperties.body?.id.trim().length === 20
      ? requestProperties.body?.id
      : false;

  const extend =
    typeof requestProperties?.body?.extend === "boolean" &&
    requestProperties.body?.extend === true
      ? true
      : false;

  if (id && extend) {
    data.read("token", id, (err, tokenData) => {
      let tokenObject = parsedJSON(tokenData);
      if (tokenObject.expires > Date.now()) {
        tokenObject.expires = Date.now() + 60 * 60 * 1000;

        //   store the updated token
        data.update("token", id, (error) => {
          if (!error) {
            callBack(200, {
              message: "Token was updated successfully",
            });
          } else {
            callBack(500, {
              error: "Server side error",
            });
          }
        });
      } else {
        callBack(400, {
          error: "Token already expired",
        });
      }
    });
  } else {
    callBack(404, {
      error: "There was a problem in your request",
    });
  }
};
handler._token.delete = (requestProperties, callBack) => {
  const id =
    typeof requestProperties?.phone === "string" &&
    requestProperties.id.trim().length === 20
      ? requestProperties.id
      : false;

  if (id) {
    // lookup the user
    data.read("token", id, (err, tokenData) => {
      if (!err && tokenData) {
        data.delete("token", id, (err) => {
          if (!err) {
            callBack(200, {
              message: "Token was successfully deleted",
            });
          } else {
            callBack(500, {
              error: "There was a problem in server side",
            });
          }
        });
      } else {
        callBack(500, {
          error: "There was a problem in server side",
        });
      }
    });
  } else {
    callBack(400, {
      error: "There was a problem deleting user",
    });
  }
};

handler._token.verify = (id, phone, callBack) => {
  data.read("token", id, (err, tokenData) => {
    if (!err && tokenData) {
      if (
        parsedJSON(tokenData).phone === phone &&
        parsedJSON(tokenData).expires > Date.now()
      ) {
      } else {
        callBack(false);
      }
    } else {
      callBack(false);
    }
  });
};

module.exports = handler;
