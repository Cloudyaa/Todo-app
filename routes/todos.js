const express = require('express');
const { TodoRecord } = require("../records/todo.record");
const { NotFoundError } = require("../utils/errors");


const todosRouter = express.Router();

todosRouter

    .get('/', async (req, res) => {
        const allTodos = [];
        for await (const found of await TodoRecord.findAllWithCursor()){
            allTodos.push(new TodoRecord(found))
        }

        res.render('./todos/allTodos', {
            todos: allTodos,
            count: allTodos.length,
        });
    })

    .get('/:id', async (req, res) => {
        const oneTodo = await TodoRecord.find(req.params.id);
        if (!oneTodo) {
            throw new NotFoundError();

        }
        res.render('./todos/oneTodo', {
            todos: oneTodo,
        });
    })

    .post('/', async (req, res) => {
        const newTodo = new TodoRecord({
            taskName: req.body.taskName,
            createdAt: new Date(),
        });
        await newTodo.insert();
        res
            .status(201)
            .redirect('/todos');
    })

    .post('/:id', async (req, res) => {
        const foundTodo = await TodoRecord.find(req.params.id);
        if (!foundTodo) {
            throw new NotFoundError();
        }

        foundTodo.taskName = req.body.taskName;

        await foundTodo.update();
        res
            .status(201)
            .redirect('/todos');
    })

    .delete('/:id', async (req, res) => {
            const foundTodo = await TodoRecord.find(req.params.id);
            await foundTodo.delete();
            res.render('./todos/deleted', {
                todos: foundTodo,
            });
    })


module.exports = {
    todosRouter,
}


