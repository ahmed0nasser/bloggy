const bcrypt = require("bcrypt");
const User = require("../models/User");

async function addNewUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);
  const numUsers = await User.estimatedDocumentCount();
  await User.create({
    _id: numUsers + 1,
    name: username,
    password: hashedPassword,
  });
}

module.exports = { addNewUser };