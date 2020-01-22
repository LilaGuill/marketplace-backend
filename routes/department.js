const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

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
router.get("/department/read", async (req, res) => {
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
    const departmentToDelete = await Department.findById(req.fields.id);
    if (departmentToDelete) {
      await departmentToDelete.remove();
      res.json({ message: "Department Delete" });
    } else {
      res.json({ message: "Department not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});
module.exports = router;
