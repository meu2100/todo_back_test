const express = require("express");
const router = express.Router();
const todoback = require("./api");
const user = require("./users")

router.use("/todos", todoback);
router.use("/", user);

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
