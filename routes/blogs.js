const express = require("express");
const router = express.Router();

const blogEntry = {
  id: 1,
  title: "Blog Title",
  date: "Publishing date",
  description: "blog description you wanna write",
};
const blogEntries = [];
for (let i = 0; i < 5; i++) {
  blogEntries.push(blogEntry);
}

router.get("/", (req, res) => {
  res.render("pages/blogs", { user: req.user, blogEntries });
});

router.get("/:blogTitle/:blogId", (req, res) => {
  // #TODO: fetch blog with id=blogId from database
  res.render("pages/blog", { user: req.user });
});

router.get("/:blogTitle/:blogId/edit", (req, res) => {
  res.render("pages/blogEdit", { user: req.user });
});

module.exports = router;
