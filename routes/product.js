const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const isFiltered = require("../middleware/isFiltered");

router.post("/product/create", async (req, res) => {
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
  try {
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/product/update", async (req, res) => {
  try {
    const updateProduct = await Product.findById(req.query.id);

    if (req.fields.title) {
      updateProduct.title = req.fields.title;
    }
    if (req.fields.price) {
      updateProduct.price = req.fields.price;
    }
    if (req.fields.description) {
      updateProduct.description = req.fields.description;
    }
    if (req.fields.category) {
      updateProduct.category = req.fields.category;
    }

    await updateProduct.save();
    res.json(updateProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/product/delete", async (req, res) => {
  try {
    const deleteProduct = Product.findById(req.query.id);
    await deleteProduct.remove();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
