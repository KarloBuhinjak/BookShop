const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = verifyAdmin;
