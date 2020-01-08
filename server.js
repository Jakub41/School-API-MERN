// Config of the app - ENV
const config = require("./src/config/config");

// Requiring libs
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
// Log libs
const morgan = require("morgan");
const winston = require("winston"),
    expressWinston = require("express-winston");

const app = express();
const port = config.server.port || 5000;

app.use(cors());
app.use(express.json());

// Logging always before routes
app.use(morgan("dev"));
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function(req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    })
);

// Main Routing
app.use(require("./src/routes/index.routes"));

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));

app.use((req, res) => {
    res.status(200).send({
        route: req.originalUrl,
        status: 200,
        message: "ok"
    });
});

// Endpoints list
console.log(listEndpoints(app));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
