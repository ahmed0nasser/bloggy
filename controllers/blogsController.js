const Blog = require("../models/Blog");
const Counter = require("../models/Counter");
const utils = require("../utils/utils");
// Errors
const RequestError = require("../errors/RequestError");
const UnexpectedError = require("../errors/UnexpectedError");

// #TODO: validate blog data

async function handleNewBlog(req, res, next) {
  const { title, body, summary } = req.body;
  try {
    await createNewBlog({ title, body, summary });
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogEdit(req, res, next) {
  const { title, body, summary } = req.body;
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    await updateBlog(blogId, { title, body, summary });
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogFetch(req, res, next) {
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    req.blog = await getBlog(blogId);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleBlogDelete(req, res, next) {
  const blogId = utils.getBlogIdFromUri(req.params.blogUri);
  try {
    await deleteBlog(blogId);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function getBlog(blogId) {
  return await Blog.findById(blogId);
}

async function getAllBlogs() {
  return await Blog.find({});
}

async function createNewBlog({ title, body, summary }) {
  const blogCounter = await Counter.findById("blog");
  const blogId = await blogCounter.getNextSequenceValue();
  const date = utils.formatBlogDate(Date.now());
  const uri = utils.constructBlogUri(title, blogId);
  await Blog.create({ _id: blogId, title, body, summary, date, uri });
  return blogId;
}

async function updateBlog(blogId, { title, body, summary }) {
  const date = utils.formatBlogDate(Date.now());
  const uri = utils.constructBlogUri(title, blogId);
  await Blog.findByIdAndUpdate(blogId, { title, body, summary, date, uri });
  return blogId;
}

async function deleteBlog(blogId) {
  await Blog.findByIdAndDelete(blogId);
  return blogId;
}

module.exports = {
  handleNewBlog,
  handleBlogEdit,
  handleBlogFetch,
  handleBlogDelete,
  getBlog,
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
