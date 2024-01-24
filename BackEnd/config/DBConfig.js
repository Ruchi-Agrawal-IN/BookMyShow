const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING);
//
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("db is connected");
});
