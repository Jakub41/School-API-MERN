// URL
const { server } = require("../config/config");
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Defining the Index Routers
router.use(server.url + "students", require("./students"));
router.use(server.url + "projects", require("./projects"));

// Exporting the Index Router
module.exports = router;
