require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !correctPassword) {
    return res.status(401).json({ error: "Invalid user or password" });
  }

  const userPayload = { id: user._id, username: user.username };

  const token = jwt.sign(userPayload, process.env.SECRET);

  res.send({ token, username: user.username, name: user.name });
});

module.exports = router;
