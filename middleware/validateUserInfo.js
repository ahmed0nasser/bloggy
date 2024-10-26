const validationController = require("../controllers/validationController")

module.exports = (req, res, next) => {
  if (!validationController.isValidUsername(req.body.username))
    res.status(404).send("Invalid Username")
  if (!validationController.isValidPassword(req.body.password))
    res.status(404).send("Invalid Password")
  next()
}