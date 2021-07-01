const bcrypt = require("bcrypt");

const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  try {
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    isImportant: 1,
  });
  //   console.log(users);
  res.json(users);
});

module.exports = usersRouter;
