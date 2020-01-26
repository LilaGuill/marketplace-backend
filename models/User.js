const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    require: true,
    lowercase: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    minLength: 6,
    maxLength: 254
  }
});

module.exports = User;
