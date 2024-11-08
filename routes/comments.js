const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

function rerenderBlog(req, res) {
  res.render("pages/blog", {
    user: req.user,
    blog: req.blog,
    popup: req.popup,
  });
}

router.post("/", commentsController.handleNewComment, (req, res) => {
  res.redirect(`/blogs/${req.blog.uri}`);
});

router.post(
  "/:commentIndex/like",
  commentsController.handleCommentLike,
  (req, res) => {
    res.redirect(`/blogs/${req.blog.uri}`);
  }
);

router.post(
  "/:commentIndex/edit",
  commentsController.handleCommentEdit,
  (req, res) => {
    res.redirect(`/blogs/${req.blog.uri}`);
  }
);

router.post(
  "/:commentIndex/delete",
  commentsController.handleCommentDelete,
  (req, res) => {
    res.redirect(`/blogs/${req.blog.uri}`);
  }
);

module.exports = router;
