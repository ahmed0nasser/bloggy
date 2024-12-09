const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.getAllBlogs();
  res.render("pages/blogs", { user: req.user, blogs });
});

// # TODO: refuse unauthorized access
router
  .route("/new")
  .get((req, res) => {
    res.render("pages/blogEdit", { user: req.user });
  })
  .post(blogsController.handleNewBlog, (req, res) => {
    req.popup
      ? res.render("pages/blogEdit", { popup: req.popup })
      : res.redirect("/blogs");
  });

router
  .route("/:blogUri/edit")
  .get(blogsController.handleBlogFetch, (req, res) => {
    res.render("pages/blogEdit", { user: req.user, blog: req.blog });
  })
  .post(blogsController.handleBlogEdit, (req, res) => {
    req.popup
      ? res.render("pages/blogEdit", { popup: req.popup })
      : res.redirect("/blogs");
  });

router.post(
  "/:blogUri/delete",
  blogsController.handleBlogDelete,
  (req, res) => {
    res.redirect("/blogs");
  }
);

router.use("/:blogUri/comments", blogsController.handleBlogFetch, require("./comments"))

router.get("/:blogUri", blogsController.handleBlogFetch, (req, res) => {
  req.popup
    ? res.render("pages/blogs", { popup: req.popup })
    : res.render("pages/blog", { user: req.user, blog: req.blog });
});

module.exports = router;
