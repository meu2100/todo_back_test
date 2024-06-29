const express = require("express");
const router = express.Router();

const db = require("../models");
const Todo = db.Todoback;

router.get("/", (req, res) => {
  return Todo.findAll({
    attributes: ["id", "name"],
    raw: true,
  })
    .then((todos) => res.render("todos", { todos }))
    .catch((err) => res.status(422).json(err));
});

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  return Todo.create({ name, content })
    .then(() => res.redirect("/todos"))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  return Todo.findByPk(id, {
    attributes: ["id", "name", "content"],
    raw: true,
  })
    .then((todo) => res.render("todo", { todo }))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id, {
    attributes: ["id", "name", "content"],
    raw: true,
  }).then((todo) => res.render("edit", { todo }));
});

router.put("/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  return Todo.update(
    { name: body.name, content: body.content },
    { where: { id } }
  ).then(() => res.redirect(`/todos/${id}`));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.destroy({ where: { id } }).then(() => res.redirect("/todos"));
});

module.exports = router;
