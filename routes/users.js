const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// # TODO: refuse unauthorized access

router.get("/", async (req, res) => {
  const users = await usersController.getUsers();
  res.render("pages/users", { user: req.user, users });
});

// #TODO: handle users profile
router.get("/:username/profile", (req, res) => {
  res.end("nothing yet");
})

module.exports = router;
