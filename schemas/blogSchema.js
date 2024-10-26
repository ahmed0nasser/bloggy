const { Schema } = require('mongoose')

module.exports = new Schema({
  title: String,
  body: String,
  summary: String,
  date: {type: Date, default: Date.now},
  comments: [ { author: { name: String, img: String }, body: String, likes: Number, date: Date } ]
})