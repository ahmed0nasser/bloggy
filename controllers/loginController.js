const bcrypt = require("bcrypt");
const { validateUserInfo } = require("../controllers/validationController");
const User = require("../models/User");
const RequestError = require("../Errors/RequestError");
const UnexpectedError = require("../Errors/UnexpectedError");
const WrongPasswordError = require("../Errors/WrongPasswordError");
const NotFoundError = require("../Errors/NotFoundError");

async function handleLogin(req, res, next) {
  const { username, password } = req.body;
  try {
    validateUserInfo(username, password);
    const user = await User.findOne({ name: username });
    if (!user) throw new NotFoundError(`Username ${username}`);
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new WrongPasswordError();
    // #TODO: return session id cookie
  } catch (error) {
    req.error = error instanceof RequestError ? error : new UnexpectedError();
    next();
  }
}

module.exports = { handleNewUser };
