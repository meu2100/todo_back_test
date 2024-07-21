const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.User;

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", (req, res) => {
  return res.send(req.body);
});

router.post("/logout", (req, res) => {
  return res.send("logout");
});

router.post("/", (req, res) => {
  return res.send(req.body);
});

module.exports = router;
