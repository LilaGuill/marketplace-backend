const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Create
router.post("/user/create", async (req, res) => {
  try {
    const newUser = new User({
      username: req.fields.username,
      email: req.fields.email
    });
    await newUser.save();
    res.json({ newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Read
router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Update
router.post("/user/update", async (req, res) => {
  try {
    const updateUser = await User.findOne({ _id: req.query.id });

    updateUser.username = req.fields.username;
    updateUser.email = req.fields.email;

    await updateUser.save();
    res.json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete()
router.post("/user/delete", async (req, res) => {
  const userDelele = await User.findById(req.query.id);
  await userDelele.remove();
  res.json(userDelele);
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
