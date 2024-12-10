const { model } = require("mongoose");
const blogSchema = require("../schemas/blogSchema");
const Counter = require("../models/Counter");
const utils = require("../utils/utils")
const Blog = model("Blog", blogSchema);

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
  getBlog,
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
