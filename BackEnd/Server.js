const express = require("express");

//create a .env file and config it here
require("dotenv").config();
const dbConfig = require("./config/DBConfig");
const PORT = process.env.PORT;
// use middleware <app.use>
//  below use middleware is taking json as input middleware
const app = express();
app.use(express.json());
// create routes
const userRoute = require("./routes/UserRoute");
app.use("/api/users", userRoute);

//start express server
app.listen(PORT, () => {
  console.log("Server running from port: " + PORT);
});
