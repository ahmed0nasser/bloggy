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

module.exports = { isValidUsername, isValidPassword };
