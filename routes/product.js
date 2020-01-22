const express = require("express");
const router = express.Router();

router.post("/product/create", (req, res) => {
  res.json({ message: "Page product create" });
});

router.get("/product/read", (req, res) => {
  res.json({ message: "Page product read" });
});

router.post("/product/update", (req, res) => {
  res.json({ message: "Page product update" });
});
router.post("/product/delete", (req, res) => {
  res.json({ message: "Page product delete" });
});

module.exports = router;
