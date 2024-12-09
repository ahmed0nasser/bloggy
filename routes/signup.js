const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router
  .route("/")
  .get((req, res) => {
    if (req.user) return res.redirect("/");
    res.render("pages/signup");
  })
  .post(registerController.handleSignup, (req, res) => {
    req.popup
      ? res.render("pages/signup", { popup: req.popup })
      : res.redirect("/");
  });

module.exports = router;
