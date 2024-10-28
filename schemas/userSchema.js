const { Schema } = require('mongoose')

module.exports = new Schema({
  _id: Number,
  name: String,
  password: String,
  description: {type: String, default: ""},
  img: String
})