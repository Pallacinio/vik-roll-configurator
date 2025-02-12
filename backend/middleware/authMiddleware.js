const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Brak uprawnień" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Nieautoryzowany, zły token" });
    }
  } else {
    res.status(401).json({ message: "Brak tokena" });
  }
};

module.exports = { protect };
