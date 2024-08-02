const express = require("express");
const app = express();
const router = require("./routes");
const passport = require("passport");
const port = 3000;

const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const { where } = require("sequelize");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(router);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
