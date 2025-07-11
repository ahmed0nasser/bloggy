const { validateUserInfo } = require("./validationController");
const { createNewSession, SESSION_COOKIE } = require("./sessionController");
const User = require("../models/User");
// Errors
const RequestError = require("../errors/RequestError");
const UnexpectedError = require("../errors/UnexpectedError");
const SameUserError = require("../errors/SameUserError");

async function handleSignup(req, res, next) {
  const { username, password } = req.body;
  try {
    validateUserInfo(username, password);
    const sameUsername = await User.getUserByName(username);
    if (sameUsername) throw new SameUserError();
    const userId = await User.createNewUser(username, password);
    const sessionId = await createNewSession(userId);
    res.cookie(SESSION_COOKIE.name, sessionId, SESSION_COOKIE.options);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

module.exports = { handleSignup };
