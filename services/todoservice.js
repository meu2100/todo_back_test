//呼叫model->使用class語法

const db = require("../models");
const Todo = db.Todoback;

class TodoService {
  async createTodo(data) {
    const { name, content } = data;
    try {
      const todo = await Todo.create({ name, content });
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTodoById(id) {
    try {
      const todo = await Todo.findByPk(id, {
        attributes: ["id", "name", "content", "isComplete"],
        raw: true,
      });
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateTodo(id, data) {
    const { name, content, isComplete } = data;
    try {
      const todo = await Todo.update(
        { name, content, isComplete: isComplete === "completed" },
        { where: { id } }
      );
      return todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

      async deleteTodo(id) {
        try{
          const result = await Todo.destroy({ where: { id } })
          return result
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
}

module.exports = new TodoService();
