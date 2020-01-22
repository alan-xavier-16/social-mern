const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/default");

module.exports = (req, res, next) => {
  /** Get token from header */
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtToken);
    req.user = decoded.user; /** Payload from jwt.sign */
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
