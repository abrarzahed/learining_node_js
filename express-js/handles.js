const handler = (req, res) => {
  console.log(req.accepts("html"));
  res.send("Hello world");
};

module.exports = handler;
