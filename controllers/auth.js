const Client = require("../models/client");
const { ErrorHandler } = require("./error");
const { sendCookies } = require("../utils/util");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(500).json({
        success: false,
        message: "You are not registered, Please sign up first",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, client.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookies(client, res, `welcome back, ${client.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `You are logged out`,
      user: req.user,
    });
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let client = await Client.findOne({ email });

    if (client) return next(new ErrorHandler("Client Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    client = await Client.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    sendCookies(client, res, "Registeration Successfull");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  signup,
};
