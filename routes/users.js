const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.User;
const userservice = require("../services/userservice");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    return User.findOne({
      attributes: ["id", "name", "email", "password"],
      where: { email: username },
      raw: true,
    })
      .then((user) => {
        if (!user || user.password !== password) {
          return done(null, false, { message: "email 或密碼錯誤" });
        }
        return done(null, user);
      })
      .catch((error) => {
        error.errorMessage = "登入失敗";
        done(error);
      });
  })
);

passport.serializeUser((user, done) => {
  const { id, name, email } = user;
  return done(null, { id, name, email });
});

passport.deserializeUser((user, done) => {
  done(null, { id: user.id });
});

router.get("/", (req, res) => {
  res.send("這是index頁面");
});

router.get("/register", (req, res) => {
  return res.send("註冊頁面");
});

router.get("/login", (req, res) => {
  return res.send("登錄頁面");
});

router.get("/logout", (req, res) => {
  return res.send("登出頁面");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/todos",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }

    return res.redirect("/login");
  });
});

router.post("/register", (req, res, next) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !password) {
    req.flash("error", "email 及 password 為必填");
    return res.redirect("back");
  }

  if (password !== confirmPassword) {
    req.flash("error", "驗證密碼與密碼不符");
    return res.redirect("back");
  }

  return User.count({ where: { email } })
    .then((rowCount) => {
      if (rowCount > 0) {
        req.flash("error", "email 已註冊");
        return;
      }

      return User.create({ email, name, password });
    })
    .then((user) => {
      if (!user) {
        return res.redirect("back");
      }

      req.flash("success", "註冊成功");
      return res.redirect("/login");
    })
    .catch((error) => {
      error.errorMessage = "註冊失敗";
      next(error);
    });
});

// router.post("/register", async (req, res) => {
//   const { mail, name, password, confirmPassword } = req.body;
//   try {
//     await userservice.createUsers({ mail, name, password, confirmPassword });
//     return res.send(req.body);
//   } catch (err) {
//     res.send("Error, Please check!!");
//   }
// });

module.exports = router;
