// const people = require("./people");
// const _ = require("lodash");

// console.log(_.last(people));

/* 
  COMMENT: path module
*/
/*
const path = require("path");
const myPath = "E:/DRAWER/PRACTICE/node-js/basic/index.js";
console.log(path.parse(myPath));
*/

/* 
  COMMENT: os module
*/
/*
// const os = require("os");
// console.log(os.platform());
// console.log(os.homedir());
// console.log(os.freemem());
// console.log(os.cpus());
*/

/* 
  COMMENT: fs module
*/
const fs = require("fs");
/*
// fs.writeFileSync("myFile.txt", "hello programmers");
// fs.appendFileSync("myFile.txt", " how are you?");
// const textData = fs.readFileSync("myFile.txt");
// console.log(textData.toString());
// fs.readFile("myFile.txt", (err, data) => {
//   if (data.length > 0) {
//     console.log(data.toString());
//   } else console.log(err);
// });
// console.log("Normal print");
*/

/* 
  COMMENT: events module
*/
// const EventsEmitter = require("events");
// const emitter = new EventsEmitter();

// register a listener for bellRing event
const School = require("./school");
const school = new School();
school.on("bellRing", (next) => {
  console.log(`we need to go now because ${next.reason} so, ${next.whatToEat}`);
});
// rise an event
school.startPeriod();
