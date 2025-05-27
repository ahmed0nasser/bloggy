const RequestError = require("./RequestError");

module.exports = class UnauthenticatedError extends RequestError {
  constructor() {
    super("Unauthenticated Access", 401);
  }
};
