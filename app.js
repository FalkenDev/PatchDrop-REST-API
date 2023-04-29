require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/config.json");
var cluster = require("cluster"); // Load Balancer
var filter = require("content-filter"); // reliable security for MongoDB applications against the injection attacks

// Using version 1
const v1 = require("./v1/index.js");

const RateLimit = require("express-rate-limit");
const apiLimiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10000, // Limit each IP to 10000 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

// apply rate limiter to all requests
app.use(apiLimiter);

app.disable("x-powered-by");

app.set("view engine", "ejs");

app.use(require("morgan")("combined"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(filter());

app.use("/v1", v1); // Using the first version

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@patchdrop.o6jsvs5.mongodb.net/rest?retryWrites=true&w=majority`
  )
  .then(() =>
    console.log(
      `Worker ID: [ ${process.pid} ] has connected to MongoDB successfully!`
    )
  )
  .catch((err) => {
    console.log(err);
  });

if (config.development.api_cluster) {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    var cpuCount = require("os").cpus().length;
    console.log(`Total CPU ${cpuCount}`);

    // Create a worker for each CPU
    for (var worker = 0; worker < cpuCount; worker += 1) {
      cluster.fork();
    }

    // Listen for dying workers
    cluster.on("exit", function () {
      cluster.fork();
    });
  } else {
    app.listen(config.development.port, () =>
      console.log(
        `Worker ID ${process.pid}, is running on http://localhost:` +
          config.development.port
      )
    );
  }
} else {
  app.listen(config.development.port, () =>
    console.log(
      `Worker ID ${process.pid}, is running on http://localhost:` +
        config.development.port
    )
  );
}
