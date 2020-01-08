// Config of the app - ENV
const config = require("./src/config/config");

// Requiring libs
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = config.server.port || 5000;

app.use(cors());
app.use(express.json());

// Main Routing
app.use(require("./src/routes/index.routes"));

// Logging
app.use(morgan("dev"));

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
