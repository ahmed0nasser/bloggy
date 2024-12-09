const { format, formatDistanceToNow } = require("date-fns");

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function constructBlogUri(title, blogId) {
  return `${toKebabCase(title)}-${blogId}`;
}

function getBlogIdFromUri(uri) {
  return uri.split("-").at(-1);
}

function formatBlogDate(date) {
  return format(date, "PP");
}

function formatCommentDate(date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

module.exports = { constructBlogUri, getBlogIdFromUri, formatBlogDate, formatCommentDate };
