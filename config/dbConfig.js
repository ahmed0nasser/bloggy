const mongoose = require("mongoose");
const usersController = require("../controllers/usersController");

module.exports = () => {
  setImmediate(async () => {
    // Connect to DB
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    // Create admin if not exists
    if (!(await usersController.getUserByName(process.env.ADMIN_USERNAME)))
      await usersController.createNewAdmin(
        process.env.ADMIN_USERNAME,
        process.env.ADMIN_PASSWORD
      );
  });
};
