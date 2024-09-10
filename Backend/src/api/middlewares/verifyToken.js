// Middleware for JWT validation
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const actualToken = token.split(" ")[1];

  jwt.verify(actualToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
