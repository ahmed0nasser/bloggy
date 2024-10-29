const { addNewUser } = require("./usersController");
const { validateUserInfo } = require("../controllers/validationController");
const User = require("../models/User");
const RequestError = require("../Errors/RequestError");
const UnexpectedError = require("../Errors/UnexpectedError");
const SameUserError = require("../Errors/SameUserError");

async function handleSignup(req, res, next) {
  const { username, password } = req.body;
  try {
    validateUserInfo(username, password);
    const sameUsername = await User.findOne({ name: username });
    if (sameUsername) throw new SameUserError();
    addNewUser(username, password);
    // #TODO: return session id cookie
  } catch (error) {
    req.error = error instanceof RequestError? error : new UnexpectedError();
    next();
  }
}

module.exports = { handleSignup };