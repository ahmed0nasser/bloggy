async function createNewComment(blog, commentAuthor, commentBody) {
  const author = { name: commentAuthor.name, img: commentAuthor.img };
  blog.comments.unshift({ author, body: commentBody });
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

async function toggleCommentLike(blog, commentIndex, likerID) {
  const { likes } = blog.comments[commentIndex];
  const likerIndex = likes.indexOf(likerID);
  likerIndex === -1 ? likes.push(likerID) : likes.splice(likerIndex, 1);
  await blog.save();
}

module.exports = {
  createNewComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
};
