const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decodedValue.id;

    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    console.log(user.email);
    req.user = user;

    next();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Invalid token",
      error: e.message,
    });
  }
};
