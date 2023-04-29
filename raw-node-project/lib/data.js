/*
 * Title: data
 * Description: all the data
 * Author: Abrar Hussen Zahed
 */

//=== dependencies  ===//
const fs = require("fs");
const path = require("path");

//=== module scaffolding  ===//
const lib = {};
// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data in file
lib.create = (dir, file, data, callback) => {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);

        // write data in file and then close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the new file");
              }
            });
          } else {
            callback("Error writing in new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist.");
      }
    }
  );
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + "/" + file + ".json", "utf8", (err, data) => {
    callback(err, data);
  });
};

// updating existing file
lib.update = (dir, file, data, callback) => {
  // file open for update
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert the data to string
        const stringData = JSON.stringify(data);

        // truncate the file
        fs.truncate(fileDescriptor, (err) => {
          if (!err) {
            // write in the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                // close the file
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing file");
                  }
                });
              } else {
                callback("Error writing in file");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        console.log("Error updating, File may not exist");
      }
    }
  );
};

// delete existing file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

//=== module exports  ===//
module.exports = lib;
