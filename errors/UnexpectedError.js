const RequestError = require("./RequestError");

module.exports = class UnexpectedError extends RequestError {
  constructor() {
    super("Unexpected Error", 400);
  }
}