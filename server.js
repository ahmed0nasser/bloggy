const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const usersController = require("./controllers/usersController");
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

setImmediate(async () => {
  // Connect to DB
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  // Create admin if not exists
  if (!(await usersController.getUserByName(process.env.ADMIN_USERNAME)))
    await usersController.createNewAdmin(
      process.env.ADMIN_USERNAME,
      process.env.ADMIN_PASSWORD
    );
});

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

// Routes
app.get("/", (req, res) => {
  res.render("pages/index", { user: req.user });
});

// #TODO: create all route for unavailable pages (404)

app.listen(process.env.PORT);
