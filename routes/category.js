const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.post("/category/create", async (req, res) => {
  console.log(req.fields);

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
router.post("/category/delete", (req, res) => {
  res.json({ message: "Page category delete" });
});

module.exports = router;
