const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const isFiltered = require("../middleware/isFiltered");

router.post("/product/create", async (req, res) => {
  console.log(req.fields);

  try {
    const newProduct = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      category: req.fields.category
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/product", isFiltered, async (req, res) => {
  let allProduct = "";
  if (filter) {
    allProduct = Product.find(filter).populate({
      path: "category"
    });
  } else {
    allProduct = Product.find().populate({
      path: "category"
    });
  }
  if (req.query.sort === "price-asc") {
    allProduct.sort({ price: 1 });
  }
  if (req.query.sort === "price-desc") {
    allProduct.sort({ price: -1 });
  }

  const products = await allProduct;

  res.json(products);
});

router.post("/product/update", (req, res) => {
  res.json({ message: "Page product update" });
});
router.post("/product/delete", (req, res) => {
  res.json({ message: "Page product delete" });
});

module.exports = router;
