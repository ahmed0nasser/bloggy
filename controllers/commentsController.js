const utils = require("../utils/utils");
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
    await createNewComment(req.blog, req.user, commentBody);
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
    await updateComment(req.blog, req.params.commentIndex, commentBody);
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
    await deleteComment(req.blog, req.params.commentIndex);
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
    await toggleCommentLike(req.blog, req.params.commentIndex, req.user.name);
    await req.blog.save();
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function createNewComment(blog, commentAuthor, commentBody) {
  const author = { name: commentAuthor.name, img: commentAuthor.img };
  const date = utils.formatBlogDate(Date.now());
  blog.comments.unshift({ author, date, body: commentBody });
  await blog.save();
}

async function updateComment(blog, commentIndex, commentBody) {
  const comment = blog.comments[commentIndex];
  comment.isEdited = true;
  comment.body = commentBody;
  comment.date = Date.now();
  await blog.save();
}

async function deleteComment(blog, commentIndex) {
  blog.comments.splice(commentIndex, 1);
  await blog.save();
}

async function toggleCommentLike(blog, commentIndex, likerName) {
  const { likes } = blog.comments[commentIndex];
  const likerIndex = likes.indexOf(likerName);
  likerIndex === -1 ? likes.push(likerName) : likes.splice(likerIndex, 1);
  await blog.save();
}

module.exports = {
  handleNewComment,
  handleCommentEdit,
  handleCommentDelete,
  handleCommentLike,
};
