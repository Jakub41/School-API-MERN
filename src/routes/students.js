// Express
const express = require("express");
// Router
const router = express.Router();
// User model
let Student = require("../models/student.model");

router.get("/", async (req, res) => {
    await Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json("Error ", err));
});

router.post("/new", async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent
        .save()
        .then(() => res.json({
            message: "New Student added",
            data: req.body
        }))
        .catch(err => res.status(400).json("Error: ", err));
});

module.exports = router;
