// Express
const express = require("express");
// model
const db = require("../models/models.index");
// Router
const router = express.Router();

// Route to get all projects
router.get("/", async (req, res) => {
    await db.Project.find({})
        .then(projects => res.json(projects))
        .catch(err => res.json(err));
});

// Route to add a project and update student
router.post("/:id", async (req, res) => {
    // If a Project was created successfully, find one Student with an `_id` equal to `req.params.id`.
    // Update the Student to be associated with the new Project
    await db.Project.create(req.body)
        .then(project => {
            return db.Student.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { projects: project._id } },
                // { new: true } tells the query that we want it to return the updated Student -- it returns the original by default
                { new: true }
            );
        })
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        .then(student => res.json(student))
        .catch(err => res.json(err));
});

router.put("/update/:id", async (req, res) => {
    await db.Project.findById(req.params.id)
        .then(project => {
            project.set(req.body);
            project
                .save()
                .then(() =>
                    res.json({
                        message: "Project updated!",
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
    await db.Project.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
