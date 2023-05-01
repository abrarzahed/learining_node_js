/*
 * Title: Utilities
 * Description: utilities codes
 * Author: Abrar Hussen Zahed
 */

/* 
  COMMENT: dependencies
*/
const crypto = require("crypto");
const environment = require("./environmet");

/* 
  COMMENT: module scaffolding
*/
const utilities = {};

// parse json string to object
utilities.parsedJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (string) => {
  if (typeof string === "string" && string.length > 0) {
    let hash = crypto
      .createHmac("sha256", environment.secretKey)
      .update(string)
      .digest("hex");

    return hash;
  } else {
    return false;
  }
};

// create random string
utilities.createRandomString = (stringLength) => {
  let length =
    typeof stringLength === "number" && stringLength > 0 ? stringLength : false;
  if (length) {
    let possibleCharacter = "abcdefghijklmnopqrstuvwxyz123456789";
    let output = "";

    for (let i = 1; i < length; i++) {
      let randomCharacter = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length + 1)
      );

      output += randomCharacter;
    }
    return output;
  } else {
    return false;
  }
};

// export module
module.exports = utilities;
