module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    // res.status(400).end();
    res.status(400).json({ error: err.name });
  } else {
    // res.status(500).end();
    res.status(500).json({ error: err.name, message: err.message });
  }
};
