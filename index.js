const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/marketplace", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.all("*", (req, res) => {
  res.status(401).json({ message: "Page not found" });
});

app.listen(3000, (req, res) => {
  console.log("Server Started");
});
