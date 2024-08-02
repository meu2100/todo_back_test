const express = require("express");
// const router = express.Router();
const todoService = require("../services/todoservice");
const checkparamsID = require("../services/checkparamsID");

// const db = require("../models");
// const Todo = db.Todoback;

class Todorender {
  async findAllTodo(req, res) {
    try {
      const todos = await todoService.findAllTodo();
      res.render("todos", { todos });
    } catch (err) {
      res.send("Error, Please check!!");
    }
  }

  async renderPageOfNew(req, res) {
    try {
      res.render("new");
    } catch (err) {
      res.send("Error, Please check!!");
    }
  }

  async createTodo(req, res) {
    const { name, content, userId } = req.body;
    try {
      await todoService.createTodo({ name, content, userId });
      res.redirect("/todos");
    } catch (err) {
      res.send("Error, Please check!!");
    }
  }

  async getTodoById(req, res, next) {
    checkparamsID(req, res, async () => {
      const id = req.params.id;
      try {
        const todo = await todoService.getTodoById(id);
        res.render("todo", { todo });
      } catch (err) {
        res.send("Error, Please check!!");
      }
    });
  }

  async getTodoByIdEditPage(req, res, next) {
    checkparamsID(req, res, async () => {
      const id = req.params.id;
      try {
        const todo = await todoService.getTodoById(id);
        res.render("edit", { todo });
      } catch (err) {
        res.send("Error, Please check!!");
      }
    });
  }

  async updateTodo(req, res, next) {
    checkparamsID(req, res, async () => {
      const { name, content, isComplete } = req.body;
      const id = req.params.id;
      try {
        await todoService.updateTodo(id, { name, content, isComplete });
        res.redirect(`/todos/${id}`);
      } catch (err) {
        res.send("Error, Please check!!");
      }
    });
  }

  async deleteTodo(req, res, next) {
    checkparamsID(req, res, async () => {
      const id = req.params.id;
      try {
        await todoService.deleteTodo(id);
        res.redirect("/todos");
      } catch (err) {
        res.send("Error, Please check!!");
      }
    });
  }
}

module.exports = new Todorender();

// router.get("/", async (req, res) => {
//   try {
//     const todos = await todoService.findAllTodo();
//     res.render("todos", { todos });
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
//   // return Todo.findAll({
//   //   attributes: ["id", "name", "isComplete"],
//   //   raw: true,
//   // })
//   //   .then((todos) => res.render("todos", { todos }))
//   //   .catch((err) => res.status(422).json(err));
// });

//渲染和取得資料的coding分開(V)

// router.get("/new", (req, res) => {
//   return res.render("new");
// });

// router.post("/", async (req, res) => {
//   const { name, content } = req.body;
//   // const name = req.body.name;
//   // const content = req.body.content;
//   try {
//     await todoService.createTodo({ name, content });
//     res.redirect("/todos");
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
//   // return Todo.create({ name, content })
//   //   .then(() => res.redirect("/todos"))
//   //   .catch((err) => console.log(err));
// });

//在路由檢察參數(包含:所需參數是否存在or存在在合理範圍)
// router.get("/:id", checkparamsID, async (req, res) => {
//   const id = req.params.id;
//   try {
//     const todo = await todoService.getTodoById(id);
//     res.render("todo", { todo });
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }

//   // return Todo.findByPk(id, {
//   //   attributes: ["id", "name", "content", "isComplete"],
//   //   raw: true,
//   // })
//   // .then((todo) => res.render("todo", { todo }))
//   // .catch((err) => console.log(err));
// });

// router.get("/:id/edit", checkparamsID, async (req, res) => {
//   const id = req.params.id;
//   try {
//     const todo = await todoService.getTodoById(id);
//     res.render("edit", { todo });
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
//   // return Todo.findByPk(id, {
//   //   attributes: ["id", "name", "content", "isComplete"],
//   //   raw: true,
//   // }).then((todo) => res.render("edit", { todo }));
// });

// router.put("/:id", checkparamsID, async (req, res) => {
//   const { name, content, isComplete } = req.body;
//   const id = req.params.id;
//   try {
//     await todoService.updateTodo(id, { name, content, isComplete });
//     res.redirect(`/todos/${id}`);
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
//   // return Todo.update(
//   //   { name, content, isComplete: isComplete === "completed" },
//   //   { where: { id } }
//   // ).then(() => res.redirect(`/todos/${id}`));
// });

// router.delete("/:id", checkparamsID, async (req, res) => {
//   const id = req.params.id;
//   try {
//     await todoService.deleteTodo(id);
//     res.redirect("/todos");
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
//   // return Todo.destroy({ where: { id } }).then(() => res.redirect("/todos"));
// });
