const { v4: uuid } = require("uuid");
const User = require("../models/User");

const SESSION_COOKIE = {
  name: "sessionId",
  options: {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
};

async function createNewSession(userId) {
  const sessionId = uuid();
  await User.model.findByIdAndUpdate(userId, { sessionId });
  setTimeout(async () => await deleteSession(sessionId), 24 * 60 * 60 * 1000);
  return sessionId;
}

async function getSession(sessionId) {
  return await User.model.findOne({ sessionId });
}

async function deleteSession(sessionId) {
  if (await getSession(sessionId)) return true;
  await User.model.findOneAndUpdate({ sessionId }, { sessionId: "" });
  return true;
}

module.exports = {
  createNewSession,
  getSession,
  deleteSession,
  SESSION_COOKIE,
};
