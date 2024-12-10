const { Schema } = require("mongoose");

const PROFILE_IMAGE = "/imgs/person.png";

module.exports = new Schema({
  _id: Number,
  name: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  description: { type: String, default: "" },
  img: { type: String, default: PROFILE_IMAGE },
  sessionId: { type: String, default: "" },
});
