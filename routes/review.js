const express = require("express");
const router = express.Router();

//Create
router.post("review/create", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Read
router.get("/review", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Update
router.post("/review/update", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete
router.post("/review/delete", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
