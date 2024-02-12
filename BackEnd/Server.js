const debug = require("debug")("app:startup");
module.exports = debug;
const express = require("express");
const cors = require("cors");

//create a .env file and config it here
require("dotenv").config();
const dbConfig = require("./config/DBConfig");
const PORT = "8081";
// use middleware <app.use>
//  below use middleware is taking json as input middleware
const app = express();
app.use(express.json());
app.use(cors());
// create routes
//userRoute
const userRoute = require("./routes/UserRoute");
const moviesRoute = require("./routes/MovieRoute");
const theatresRoute = require("./routes/TheaterRoute");
const showsRoute = require("./routes/ShowRoute");
const bookingRoute = require("./routes/BookingRoute");
// movie Route

//theatre route

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
//shows route
app.use("/api/shows", showsRoute);
app.use("/api/bookings", bookingRoute);
//start express server
try {
  app.listen(PORT, () => {
    debug("Server running from port: " + PORT);
  });
} catch (e) {
  debug("server connection failed error is: ", e.message);
}
