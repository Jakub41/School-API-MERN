// Express
const express = require("express");
// Router
const router = express.Router();
// User model
let Student = require("../models/student.model");
// Email validity
const { rules, email } = require("../middleware/middleware.index");
// Email exist in DB
const isEmailAvailable = require("../utilities/emailCheck");

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

router.get(
    "/email/check-email",
    email.isEmailValid(),
    rules.validateRules,
    async (req, res) => {
        await isEmailAvailable(req.body.email)
            .then(valid => {
                !valid
                    ? res.send("Email is free to use")
                    : res.send("Email already used");
            })
            .catch(err => res.status(400).json({ Error: err }));
    }
);

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
        .catch(err => res.status(400).json({ Error: err }));
});

router.put("/update/:id", async (req, res) => {
    await Student.findById(req.params.id)
        .then(student => {
            student.set(req.body);
            student
                .save()
                .then(() =>
                    res.json({
                        message: "Student updated!",
                        data: req.body
                    })
                )
                .catch(err => res.status(400).json({ error: err }));
        })
        .catch(err =>
            res.status(404).json({ error: err, message: "Not found!" })
        );
});

router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
