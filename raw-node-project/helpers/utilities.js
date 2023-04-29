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

// export module
module.exports = utilities;
