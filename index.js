const express = require("express");
const app = express();
const port = 3000;

const db = require("./models");
const Todo = db.Todoback;

const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const { where } = require("sequelize");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => res.render("index"));

app.get("/todos", (req, res) => {
  return Todo.findAll({
    attributes: ["id", "name"],
    raw: true,
  })
    .then((todos) => res.render("todos", { todos }))
    .catch((err) => res.status(422).json(err));
});

app.get("/todos/new", (req, res) => {
  return res.render("new");
});

app.post("/todos", (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  return Todo.create({ name, content })
    .then(() => res.redirect("/todos"))
    .catch((err) => console.log(err));
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  return Todo.findByPk(id, {
    attributes: ["id", "name", "content"],
    raw: true,
  })
    .then((todo) => res.render("todo", { todo }))
    .catch((err) => console.log(err));
});

app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id, {
    attributes: ["id", "name", "content"],
    raw: true,
  }).then((todo) => res.render("edit", { todo }));
});

app.put("/todos/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  return Todo.update(
    { name: body.name, content: body.content },
    { where: { id } }
  ).then(() => res.redirect(`/todos/${id}`));
});

app.delete("/todos/:id", (req, res) => {
  res.send("delete todo");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
