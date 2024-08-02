const express = require("express");
const router = express.Router();
const todoback = require("./api");
const user = require("./users");
const authHandler = require("../middleware/auth-handler");

router.use("/todos", authHandler, todoback);
router.use("/", user);

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
