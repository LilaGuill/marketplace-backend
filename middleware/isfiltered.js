const express = require("express");

const isFiltered = (req, res, next) => {
  filter = {};
  console.log(req.query.priceMin);

  try {
    // filtre par titre
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    //filtre prix min
    if (req.query.priceMin) {
      filter.price = {};
      filter.price.$gte = req.query.priceMin;
    }
    if (req.query.priceMax) {
      if (filter.price === undefined) {
        filter.price = {};
        filter.price.$lte = req.query.priceMax;
      }
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    console.log(("fiter:", filter));

    return next();
  } catch (error) {
    res.status(400).json();
  }
};

module.exports = isFiltered;
