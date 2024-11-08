const RequestError = require("./RequestError");

module.exports = class UnauthorizedError extends RequestError {
  constructor() {
    super("Unauthorized Access", 403);
  }
};
