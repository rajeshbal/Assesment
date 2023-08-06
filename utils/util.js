const jwt = require("jsonwebtoken");

const jwtSecrets = process.env.JWT_SECRET || 'myjwtsecrets';

const sendCookies = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, jwtSecrets);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    });
};

module.exports = { sendCookies };
