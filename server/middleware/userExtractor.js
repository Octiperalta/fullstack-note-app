const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;
  let decodedToken = {};

  try {
    if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
      throw new Error();
    }
    token = authorization.split(" ")[1];
    decodedToken = jwt.verify(token, process.env.SECRET) || null;
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};
