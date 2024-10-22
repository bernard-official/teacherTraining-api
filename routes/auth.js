const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res
      .status(401)
      .send({ message: "Check username or password again" });
  }

  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    return res
      .status(401)
      .send({ message: "Check username or password again" });
  }
  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.send({ token });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.send({ token });
});

module.exports = router;