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

router.get("/:id", async (req, res) => {
    await Student.findById(req.params.id)
        .then(student =>
            res.json({
                message: "Student found!",
                data: student
            })
        )
        .catch(err =>
            res.status(404).json({
                message: "Student not found!",
                _id: req.params.id,
                error: err
            })
        );
});

router.post("/new", async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent
        .save()
        .then(() =>
            res.json({
                message: "New Student added",
                data: req.body
            })
        )
        .catch(err => res.status(400).json("Error: ", err));
});

router.put("/update/:id", async (req, res) => {
    await Student.findById(req.params.id)
        .then(student => {
            student.name = req.body.username;
            student.surname = req.body.description;
            student.dateOfBirth = req.body.dateOfBirth;
            student.email = req.body.email;

            student
                .save()
                .then(() => res.status(200).send("Student updated"))
                .catch(err => res.status(400).json("Error: ", err));
        })
        .catch(err => res.status(404).json("Error: ", err));
});

module.exports = router;
