const Client = require("../models/user");
const jwt = require("jsonwebtoken");


const jwtSecret = process.env.JWT_SECRET || 'myjwtsecrets';

const isAunthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  } else {
    const decoded = jwt.verify(token, jwtSecret);
    req.client = await Client.findOne({ _id: decoded._id });
    next();
  }
};


module.exports = { isAunthenticated };
