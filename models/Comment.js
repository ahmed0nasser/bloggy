const utils = require("../utils/utils");

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
  createNewComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
};
