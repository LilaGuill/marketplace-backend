const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review");
const rating = require("../utils/rating");
//Create
router.post("/review/create", async (req, res) => {
  try {
    // Création de la review
    const newReview = new Review({
      rating: req.fields.rating,
      comment: req.fields.comment,
      user: req.fields.user
    });
    await newReview.save();
    //Ajoute la review de la collection product
    const product = await Product.findById(req.fields.product);
    if (product.reviews === undefined) {
      product.reviews = [];
    }
    product.reviews.push(newReview);
    //calcul du rating moyen
    product.averageRating = await rating(product.reviews);

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Read
router.get("/review", async (req, res) => {
  try {
    const reviews = await Review.find().populate();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update
router.post("/review/update", async (req, res) => {
  try {
    const updateReview = await Review.findById(req.query.id);
    updateReview.rating = req.fields.rating;
    updateReview.comment = req.fields.comment;
    await updateReview.save();
    res.json(updateReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete
router.post("/review/delete", async (req, res) => {
  const reviewDelete = await Review.findById(req.query.id);

  const reviewProduct = await Product.findOne({ reviews: req.query.id });
  const idProduct = reviewProduct._id;
  console.log(idProduct);

  await Product.updateOne({
    $pull: { reviews: req.query.id }
  });

  const productUpdateRating = await Product.findById(idProduct);
  productUpdateRating.averageRating = await rating(productUpdateRating);

  await reviewDelete.remove();

  res.json(reviewProduct);
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
