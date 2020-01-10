// Express
const express = require("express");
// Student model
let db = require("../models/models.index");
// Router
const router = express.Router();
// Email validity
const {
    rules,
    email,
    isValidSchema
} = require("../middleware/middleware.index");
// Email exist in DB
const isEmailAvailable = require("../utilities/emailCheck");

router.get("/", async (req, res) => {
    await db.Student.find({})
        .then(students => res.json(students))
        .catch(err => res.status(400).json("Error ", err));
});

router.get("/:id", async (req, res) => {
    await db.Student.findById(req.params.id)
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

// GET A student by ID and populating it's projects
router.get("/:id/projects", async (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    await db.Student.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("projects")
        .then(student => res.json(student))
        .catch(err => res.json(err));
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
    const newStudent = new db.Student(req.body);
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
    await db.Student.findById(req.params.id)
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

router.patch("/:id", async (req, res) => {
    await db.Student.findById(req.params.id, (err, student) => {
        if (req.body._id) delete req.body._id;

        for (let s in req.body) {
            student[s] = req.body[s];
        }

        student
            .save()
            .then(() =>
                res.json({
                    message: "Student updated!",
                    data: student
                })
            )
            .catch(err => res.status(400).json({ error: err }));
    }).catch(err =>
        res.status(404).json({ error: err, message: "Not found!" })
    );
});

router.delete("/:id", async (req, res) => {
    await db.Student.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
