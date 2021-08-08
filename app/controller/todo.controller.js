const db = require("../model");
const Todo = db.todos;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Todo
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });

    // Save Todo in the database
    todo
        .save(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Todo."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Todo.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Todo with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Todo with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
                });
            } else res.send({ message: "Todo was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Todo with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            } else {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Todo with id=" + id
            });
        });
};