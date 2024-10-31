const { Schema } = require("mongoose");

module.exports = new Schema({
  _id: Number,
  title: String,
  body: String,
  summary: String,
  uri: String,
  date: { type: Date, default: Date.now },
  comments: {
    type: [
      {
        author: { name: String, img: String },
        body: String,
        likes: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});
