//呼叫model->使用class語法

const { where } = require("sequelize");
const db = require("../models");
const Todo = db.Todoback;

class TodoService {
  async findAllTodo() {
    const userId = req.user.id;
    try {
      const todos = await Todo.findAll({
        attributes: ["id", "name", "isComplete"],
        where: { userId },
        raw: true,
      });
      return todos;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createTodo(data) {
    const { name, content, userId } = data;
    try {
      const todo = await Todo.create({ name, content, userId });
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTodoById(id) {
    const id = req.params.id;
    const userId = req.user.id;
    try {
      const todo = await Todo.findByPk(id, {
        attributes: ["id", "name", "content", "isComplete", "userId"],
        raw: true,
      });
      if (!todo) {
        req.flash("error", "找不到資料");
        return res.redirect("/todos");
      }

      if (todo.userId !== userId) {
        req.flash("error", "權限不足");
        return res.redirect("/todos");
      }
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateTodo(id, data) {
    const { name, content, userId, isComplete } = data;
    try {
      const todo = await Todo.findByPk(id, {
        attributes: ["id", "name", "userId", "isComplete"],
      });
      if (!todo) {
        req.flash("error", "找不到資料");
        return res.redirect("/todos");
      }

      if (todo.userId !== userId) {
        req.flash("error", "權限不足");
        return res.redirect("/todos");
      }
      await todo.update({
        name,
        content,
        isComplete: isComplete === "completed",
      });
      req.flash("success", "更新成功!");
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteTodo(id) {
    const id = req.params.id;
    const userId = req.user.id;
    try {
      const todo = await Todo.findByPk(id, {
        attributes: ["id", "name", "userId", "isComplete"],
      });
      if (!todo) {
        req.flash("error", "找不到資料");
        return res.redirect("/todos");
      }

      if (todo.userId !== userId) {
        req.flash("error", "權限不足");
        return res.redirect("/todos");
      }
      const result = await Todo.destroy({ where: { id } });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = new TodoService();
