const mongoose = require("../utilities/dbConnect");

const schema = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
    }
};

const collectionName = "project";
const projectSchema = mongoose.Schema(schema);
const Project = mongoose.model(collectionName, projectSchema);

module.exports = Project;
