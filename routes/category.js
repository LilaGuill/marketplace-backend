const express = require("express");
const router = express.Router();

router.post("/category/create", (req, res) => {
  res.json({ message: "Page category create" });
});

router.get("/category/read", (req, res) => {
  res.json({ message: "Page category read" });
});

router.post("/category/update", (req, res) => {
  res.json({ message: "Page category update" });
});
router.post("/category/delete", (req, res) => {
  res.json({ message: "Page category delete" });
});

module.exports = router;
