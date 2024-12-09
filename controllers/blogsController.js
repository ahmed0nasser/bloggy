const Blog = require("../models/Blog");
const utils = require("../utils/utils");
// Errors
const RequestError = require("../errors/RequestError");
const UnexpectedError = require("../errors/UnexpectedError");

// #TODO: validate blog data

async function handleNewBlog(req, res, next) {
  const { title, body, summary } = req.body;
  try {
    await Blog.createNewBlog({ title, body, summary });
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogEdit(req, res, next) {
  const { title, body, summary } = req.body;
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    await Blog.updateBlog(blogId, { title, body, summary });
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogFetch(req, res, next) {
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    req.blog = await Blog.getBlog(blogId);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogDelete(req, res, next) {
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    await Blog.deleteBlog(blogId);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

module.exports = {
  handleNewBlog,
  handleBlogEdit,
  handleBlogFetch,
  handleBlogDelete,
};
