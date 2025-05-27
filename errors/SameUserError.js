const RequestError = require("./RequestError");

module.exports = class UnexpectedError extends RequestError {
  constructor() {
    super("Username already exists, please try another one", 409);
  }
}