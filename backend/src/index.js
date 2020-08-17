const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const todos = [];
let todoId = 0;

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  const search = req.query.q;
  if (typeof search === "string") {
    return res.json(todos.filter((todo) => todo.description.match(new RegExp(`${search}`, "i"))));
  }
  res.json(todos);
});

const findTodoById = (req, res, next) => {
  const todoIndex = todos.findIndex((todo) => todo.id === Number(req.params.id));
  if (todoIndex === -1) {
    return res.sendStatus(404);
  }
  res.locals.todo = todos[todoIndex];
  res.locals.indexOfTodo = todoIndex;
  next();
};

app.get("/todos/:id", findTodoById, (req, res) => {
  return res.json(res.locals.todo);
});

app.post("/todos", (req, res) => {
  if (!req.body.description) {
    return res.sendStatus(400);
  }
  const newTodo = {
    id: todoId++,
    description: req.body.description,
    finished: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put("/todos/:id", findTodoById, (req, res, next) => {
  if (!req.body.description || typeof req.body.finished !== "boolean") {
    return res.sendStatus(400);
  }
  const { description, finished } = req.body;

  const updatedTodo = {
    ...res.locals.todo,
    description,
    finished,
  };
  todos[res.locals.indexOfTodo] = updatedTodo;
  res.json(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((todo) => todo.id === Number(req.params.id));
  todos.splice(todoIndex, 1);
  res.sendStatus(204);
});

app.listen(8000, () => {
  console.log("App started listening...");
});
