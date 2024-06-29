const express = require("express");
const router = express.Router();
const todoback = require("./todos");

router.use("/todos", todoback);

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
