const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogout, (req, res) => {
  res.render("pages/index", { popup: req.popup });
});

module.exports = router;
