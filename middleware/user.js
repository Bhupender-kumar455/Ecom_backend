require("dotenv").config();

const jwt = require("jsonwebtoken");
async function verify(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ status: 404, message: "not token" });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      next();
    }
  } catch (error) {
    console.log("error in middleware verify", error);
    res.json({ message: "error" });
  }
}

module.exports = verify;
