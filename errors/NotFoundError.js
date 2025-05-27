const RequestError = require("./RequestError");

module.exports = class NotFoundError extends RequestError {
  constructor(resource) {
    super(resource + " Not Found", 404);
  }
}