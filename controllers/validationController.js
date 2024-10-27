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

async function validateUserInfo(req, res, next) {
  if (!validationController.isValidUsername(req.body.username))
    res.status(404).send("Invalid Username")
  if (!validationController.isValidPassword(req.body.password))
    res.status(404).send("Invalid Password")
  next()
}

module.exports = { isValidUsername, isValidPassword, validateUserInfo };
