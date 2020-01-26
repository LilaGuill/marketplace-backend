const express = require("express");
const router = express.Router();
const Basket = require("../models/Basket");

// Create
router.post("/basket/create", async (req, res) => {
  const basket = [];

  try {
    const product = {
      product: req.fields.product,
      quantity: req.fields.quantity
    };
    basket.push(product);

    const newBasket = await new Basket({
      basket: basket,
      user: req.query.id
    });
    await newBasket.save();
    res.json(newBasket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Read
router.get("/basket", async (req, res) => {
  try {
    const basket = await Basket.findOne({ user: req.query.id })
      .populate("User")
      .populate("Product");
    res.json(basket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
