const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const Category = require("../models/Category");
const Product = require("../models/Product");
// Create
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.fields.title
    });
    await newDepartment.save();
    res.json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});
// Read
router.get("/department", async (req, res) => {
  try {
    const Departments = await Department.find();
    res.json(Departments);
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

//Update
router.post("/department/update", async (req, res) => {
  try {
    const departmentToUpdate = await Department.findById(req.fields.id);
    if (departmentToUpdate) {
      departmentToUpdate.title = req.fields.title;
      await departmentToUpdate.save();
      res.json({ message: "Department updated" });
    } else {
      res.json({ message: "Department not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

//Delete
router.post("/department/delete", async (req, res) => {
  try {
    //filtre toutes les catégories du departement
    const categoryToDelete = await Category.find({
      department: req.query.id
    });

    // supprime tous les produits de chaque catégorie
    for (let i = 0; i < categoryToDelete.length; i++) {
      await Product.deleteMany({ category: categoryToDelete[i]._id });
    }
    //supprime les catégories de ce département
    await Category.deleteMany({ department: req.query.id });
    // supprime le department
    const departmentToDelete = await Department.findById(req.query.id);
    //supprime le department
    await departmentToDelete.remove();
    res.json({ message: "department deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
