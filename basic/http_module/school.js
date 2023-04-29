const EventsEmitter = require("events");
class School extends EventsEmitter {
  startPeriod() {
    console.log("Class started");

    setTimeout(() => {
      this.emit("bellRing", {
        reason: "second period ended",
        whatToEat: "lets have a pizza",
      });
    }, 2000);
  }
}

module.exports = School;
