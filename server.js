// Config of the app - ENV
const config = require("./src/config/config");

// Requiring libs
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
// Log libs
const morgan = require("morgan");
const { logger } = require("./src/services/services.index");

const app = express();
const port = config.server.port || 5000;

app.use(cors());
app.use(express.json());

// Logs
app.use(morgan("combined", { stream: logger.stream }));

// Main Routing
app.use(require("./src/routes/index.routes"));

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;

    // winston logging
    logger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
        } - ${req.ip}`
    );
});

app.use((req, res) => {
    res.status(404).send({
        route: req.originalUrl,
        message: "Not found!"
    });
});

// Endpoints list
console.log(listEndpoints(app));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    logger.info(`Server is running on port: ${port}`);
});
