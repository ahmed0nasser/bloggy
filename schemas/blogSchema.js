const { Schema } = require("mongoose");

module.exports = new Schema({
  _id: Number,
  title: String,
  body: String,
  summary: String,
  uri: String,
  date: String,
  comments: {
    type: [
      {
        author: { name: String, img: String },
        body: String,
        date: { type: Date, default: Date.now() },
        likes: { type: [{ type: Number }], default: [] },
        isEdited: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
});
