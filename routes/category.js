const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/Product");

router.post("/category/create", async (req, res) => {
  try {
    const newCategorie = new Category({
      title: req.fields.title,
      description: req.fields.description,
      department: req.fields.department
    });
    await newCategorie.save();
    res.json(newCategorie);
  } catch (error) {
    res.status(400).json({ message: "an error ocuured" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const allCaterory = await Category.find().populate("department");
    res.json({ allCaterory });
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
});

router.post("/category/update/:id", async (req, res) => {
  try {
    const updateCategory = await Category.findById(req.params.id);
    updateCategory.title = req.fields.title;

    await updateCategory.save();

    res.json(updateCategory);
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
});
router.post("/category/delete", async (req, res) => {
  try {
    const deleteCategory = await Category.findById(req.query.id);
    //supprimer tous les produits liès à cette catégorie
    await Product.deleteMany({
      category: req.query.id
    });
    // supprimer la catégorie
    await deleteCategory.remove();

    res.json(deleteCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
