const { Schema } = require("mongoose");
const fs = require("fs");
const path = require("path");

const PROFILE_IMAGE =
  "data:image/png;base64," +
  fs.readFileSync(path.join(__dirname, "..", "public", "imgs", "person.png"), {
    encoding: "base64",
  });

module.exports = new Schema({
  _id: Number,
  name: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  description: { type: String, default: "" },
  img: { type: String, default: PROFILE_IMAGE },
  sessionId: { type: String, default: "" },
});
