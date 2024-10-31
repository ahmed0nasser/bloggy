const { model } = require("mongoose");
const blogSchema = require("../schemas/blogSchema");

module.exports = model("Blog", blogSchema);
