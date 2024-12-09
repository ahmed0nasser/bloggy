const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = () => {
  setImmediate(async () => {
    // Connect to DB
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    // Create admin if not exists
    if (!(await User.getUserByName(process.env.ADMIN_USERNAME)))
      await User.createNewAdmin(
        process.env.ADMIN_USERNAME,
        process.env.ADMIN_PASSWORD
      );
  });
};
