const mongoose = require("mongoose");

function connect(url) {
  mongoose.connect(url).then(() => console.log("mongo connected!"));
}
module.exports = connect;
