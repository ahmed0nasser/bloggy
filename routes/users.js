const express = require("express");
const router = express.Router();
const User = require("../models/User");

// # TODO: refuse unauthorized access

router.get("/", async (req, res) => {
  const users = await User.getUsers();
  res.render("pages/users", { user: req.user, users });
});

// #TODO: handle users profile
router.get("/:username/profile", (req, res) => {
  res.render("pages/profile.ejs", { user: req.user });
})

module.exports = router;
