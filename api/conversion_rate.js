const db = require("redis").createClient(6379, "127.0.0.1");
const express = require("express");
const app = express();
const port = 5000;
// Error Handling
db.on("error", function (err) {
  console.log("Error " + err);
});

// usd_to_naira

// get
app.get("/api/get/:key", (req, res) => {
  var key = req.params.key;
  db.get(key, function (err, data) {
    res.send(data);
    console.log(data);
  });
});

// set or update
app.get("/api/set/:key/:val", (req, res) => {
  var key = req.params.key;
  var val = req.params.val;
  db.set(key, val, db.print);
  res.send("Updated!");
  console.log("Updated!");
});

app.listen(port, () =>
  console.log(`Conversion Rates api listening on port ${port}`)
);
