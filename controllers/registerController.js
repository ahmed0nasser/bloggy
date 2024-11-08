const { validateUserInfo } = require("./validationController");
const { createNewSession } = require("./sessionController");
const usersController = require("./usersController");
// Errors
const RequestError = require("../errors/RequestError");
const UnexpectedError = require("../errors/UnexpectedError");
const SameUserError = require("../errors/SameUserError");
// Constants
const SESSION_COOKIE = {
  name: "sessionId",
  options: {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
};

async function handleSignup(req, res, next) {
  const { username, password } = req.body;
  try {
    validateUserInfo(username, password);
    const sameUsername = await usersController.getUserByName(username);
    if (sameUsername) throw new SameUserError();
    const userId = await usersController.createNewUser(username, password);
    const sessionId = await createNewSession(userId);
    res.cookie(SESSION_COOKIE.name, sessionId, SESSION_COOKIE.options);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

module.exports = { handleSignup };
