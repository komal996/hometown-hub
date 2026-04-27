const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // ✅ Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // ✅ Extract token (Bearer token OR direct token)
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user to request
    req.user = decoded.user || decoded;

    next();

  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;