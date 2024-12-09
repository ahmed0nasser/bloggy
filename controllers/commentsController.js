const Comment = require("../models/Comment");

// Errors
const RequestError = require("../errors/RequestError");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const UnexpectedError = require("../errors/UnexpectedError");

// #TODO: comment validation

async function handleNewComment(req, res, next) {
  try {
    const { comment: commentBody } = req.body;
    if (!commentBody) throw new RequestError("Comment must not be empty", 400);
    if (!req.user) throw new UnauthenticatedError();
    await Comment.createNewComment(req.blog, req.user, commentBody);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleCommentEdit(req, res, next) {
  try {
    const { comment: commentBody } = req.body;
    if (!commentBody) throw new RequestError("Comment must not be empty", 400);
    if (!req.user) throw new UnauthenticatedError();
    if (
      !(
        req.user.name === req.blog.comments[req.params.commentIndex].author.name
      )
    )
      throw new UnauthorizedError();
    if (
      req.params.commentIndex < 0 ||
      req.params.commentIndex >= req.blog.comments.length
    )
      throw new RequestError("Invalid Comment Index", 400);
    await Comment.updateComment(req.blog, req.params.commentIndex, commentBody);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleCommentDelete(req, res, next) {
  try {
    if (!req.user) throw new UnauthenticatedError();
    if (
      !req.user.isAdmin &&
      !(
        req.user.name === req.blog.comments[req.params.commentIndex].author.name
      )
    )
      throw new UnauthorizedError();
    if (
      req.params.commentIndex < 0 ||
      req.params.commentIndex >= req.blog.comments.length
    )
      throw new RequestError("Invalid Comment Index", 400);
    await Comment.deleteComment(req.blog, req.params.commentIndex);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleCommentLike(req, res, next) {
  try {
    if (!req.user) throw new UnauthenticatedError();
    if (
      req.params.commentIndex < 0 ||
      req.params.commentIndex >= req.blog.comments.length
    )
      throw new RequestError("Invalid Comment Index", 400);
    await Comment.toggleCommentLike(req.blog, req.params.commentIndex, req.user.name);
    await req.blog.save();
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

module.exports = {
  handleNewComment,
  handleCommentEdit,
  handleCommentDelete,
  handleCommentLike,
};
