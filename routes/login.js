const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/")
  .get((req, res) => {
    if (req.user) res.redirect("/");
    res.render("pages/login");
  })
  .post(authController.handleLogin, (req, res) => {
    req.popup
      ? res.render("pages/login", { popup: req.popup })
      : res.redirect("/");
  });

module.exports = router;
