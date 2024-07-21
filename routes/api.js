//處理讀寫資料與畫面渲染無關
const express = require("express");
const router = express.Router();
const todorender = require("./todos");

router.get("/", todorender.findAllTodo);

router.get("/new", todorender.renderPageOfNew);

router.post("/", todorender.createTodo);

router.get("/:id", todorender.getTodoById);

router.get("/:id/edit", todorender.getTodoByIdEditPage);

router.put("/:id", todorender.updateTodo);

router.delete("/:id", todorender.deleteTodo);

module.exports = router;
