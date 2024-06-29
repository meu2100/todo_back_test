const express = require("express");
const app = express();
const port = 3000;

const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const { where } = require("sequelize");
const router = require("./routes");

app.use(router);
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
