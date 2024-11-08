const bcrypt = require("bcrypt");
const User = require("../models/User");
const Counter = require("../models/Counter");
// Constants
const SALT_ROUNDS = 10;

async function createNewUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const userCounter = await Counter.findById("user");
  const userId = await userCounter.getNextSequenceValue();
  await User.create({
    _id: userId,
    name: username,
    password: hashedPassword,
  });
  return userId;
}

async function createNewAdmin(username, password) {
  const userId = await createNewUser(username, password);
  await User.findByIdAndUpdate(userId, { isAdmin: true });
  return userId;
}

async function getUserByName(username) {
  return await User.findOne({ name: username });
}

async function getUsers() {
  return await User.find({});
}

module.exports = { createNewUser, createNewAdmin, getUserByName, getUsers };
