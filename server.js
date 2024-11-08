const fs = require("fs");
const path = require("path");
const express = require("express");
const dbConfig = require("./config/dbConfig");
// Require Middleware
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("./middleware/session");

const app = express();

// Create log stream
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Issue DB connenction
dbConfig();

// Template Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);
app.use(morgan("tiny", { stream: accessLogStream }));
// Routers
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/signup", require("./routes/signup"));
app.use("/blogs", require("./routes/blogs"));
app.use("/users", require("./routes/users"));

// Routes
app.get("/", (req, res) => {
  res.render("pages/index", { user: req.user });
});

// #TODO: create all route for unavailable pages (404)

app.listen(process.env.PORT);
