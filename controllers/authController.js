const bcrypt = require("bcrypt");
const { validateUserInfo } = require("./validationController");
const { createNewSession, deleteSession } = require("./sessionController");
const { getUserByName } = require("../models/User");
// Errors
const RequestError = require("../errors/RequestError");
const UnexpectedError = require("../errors/UnexpectedError");
const WrongPasswordError = require("../errors/WrongPasswordError");
const NotFoundError = require("../errors/NotFoundError");
// Constants
const SESSION_COOKIE = {
  name: "sessionId",
  options: {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
};

async function handleLogin(req, res, next) {
  const { username, password } = req.body;
  try {
    validateUserInfo(username, password);
    const user = await getUserByName(username);
    if (!user) throw new NotFoundError(`Username "${username}"`);
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new WrongPasswordError();
    const sessionId = await createNewSession(user._id);
    res.cookie(SESSION_COOKIE.name, sessionId, SESSION_COOKIE.options);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

async function handleLogout(req, res, next) {
  try {
    if (!req.user) throw new RequestError("You are not logged in", 400);
    await deleteSession(req.user.sessionId);
    res.clearCookie(SESSION_COOKIE.name, SESSION_COOKIE.options);
  } catch (error) {
    req.popup = error instanceof RequestError ? error : new UnexpectedError();
  }
  next();
}

module.exports = { handleLogin, handleLogout };
