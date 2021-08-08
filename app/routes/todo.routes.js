module.exports = app => {
    const todos = require("../controller/todo.controller.js");

    var router = require("express").Router();

    // Create a new Todo
    router.post("/", todos.create);

    // Get a todo
    router.get("/", todos.findAll);

    //  Get a todo with id
    router.get("/:id", todos.findOne);

    // Update a Todo with id
    router.put("/:id", todos.update);

    // Delete a Todo with id
    router.delete("/:id", todos.delete);



    app.use('/api/todo', router);
};