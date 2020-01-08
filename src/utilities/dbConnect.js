const config = require("../config/config");
const mongoose = require("mongoose");
const uri = config.db.url;
const port = config.db.port;
const name = config.db.name;

const baseUrl = uri + port + name;
console.log(baseUrl);

mongoose.connect(baseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});

db.once("open", () => {
    console.log("> successfully opened the database");
});

module.exports = mongoose;
