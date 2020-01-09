const mongoose = require("../utilities/dbConnect");

const schema = {
    name: {
        type: String,
        minlength: [4, "Name need to be longer then 4 characters"],
        maxlength: [15, "Name cannot exceed 15 characters"],
        required: true,
        unique: true
    },
    description: {
        type: String,
        minlength: [25, "Description need to be longer then 25 characters"],
        maxlength: [125, "Description cannot exceed 125 characters"],
        required: true
    },
    link: {
        type: String,
        required: false
    }
};

const collectionName = "project";
const projectSchema = mongoose.Schema(schema);
const Project = mongoose.model(collectionName, projectSchema);

module.exports = Project;
