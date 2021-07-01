const router = require("express").Router();
const Note = require("../models/Note");
const User = require("../models/User");
const userExtractor = require("../middleware/userExtractor");

router.get("/", async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  res.json(notes);
});

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    isImportant: 1,
  });
  //   console.log(users);
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      note ? res.json(note) : res.status(404).end();
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/api/notes/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.post("/", userExtractor, async (req, res, next) => {
  const {
    content,
    type = "none",
    isChecked = false,
    isImportant = false,
  } = req.body;

  const { userId } = req;

  if (!req.body || !content) {
    return res.status(400).json({ error: "Incorrect content format" });
  }

  const user = await User.findById(userId);

  const newNote = new Note({
    content,
    type,
    isChecked,
    isImportant,
    user: user._id,
  });

  try {
    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    res.json(savedNote);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
