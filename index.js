const express = require("express");
const app = express();
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/marketplace", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const category = require("./routes/category");
const department = require("./routes/department");
const product = require("./routes/product");
const user = require("./routes/user");
const review = require("./routes/review");
const basket = require("./routes/basket");

app.use(category);
app.use(department);
app.use(product);
app.use(user);
app.use(review);
app.use(basket);

app.all("*", (req, res) => {
  res.status(401).json({ message: "Page not found" });
});

app.listen(3000, (req, res) => {
  console.log("Server Started");
});
