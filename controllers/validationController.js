const RequestError = require("../errors/RequestError");

function isValidUsername(username) {
  if (!(typeof username === "string")) return false;
  if (username.length < 3) return false;
  if (username.length > 30) return false;
  return true;
}

function isValidPassword(password) {
  if (!(typeof password === "string")) return false;
  if (password.length < 8) return false;
  return true;
}

function validateUserInfo(username, password) {
  if (!isValidUsername(username))
    throw new RequestError("Invalid Username", 400);

  if (!isValidPassword(password))
    throw new RequestError("Invalid Password", 400);
}

module.exports = { isValidUsername, isValidPassword, validateUserInfo };
