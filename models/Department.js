const mongoose = require("mongoose");

const Department = mongoose.model("Department", {
  title: {
    type: String,
    unique: true,
    lowercase: true
  }
});

module.exports = Department;
