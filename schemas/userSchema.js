const { Schema } = require('mongoose')

module.exports = new Schema({
  name: String,
  password: String,
  description: String,
  img: String
})