const RequestError = require("./RequestError");

module.exports = class WrongPasswordError extends RequestError {
  constructor() {
    super("Wrong Password", 401);
  }
}