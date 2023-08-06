const User = require("../models/user");
const Account = require("../models/account");
const Agent = require("../models/agent");
const Policy = require("../models/policy");
const csvTojson = require("csvtojson");

const importCsv = async (req, res) => {
  const userData = [];
  const policyData = [];
  const agentData = [];
  const accountData = [];
  try {
    csvTojson()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < 5; i++) {
          userData.push({
            name: response[i].firstname,
            email: response[i].email,
            dob: response[i].dob,
            phone: response[i].phone,
            address: {
              street: response[i].address,
              city: response[i].city,
              state: response[i].state,
              zip: response[i].zip,
            },
            passwod: response[i].firstname,
            policy_number: response[i].policy_number,
          });

          policyData.push({
            policy_number: response[i].policy_number,
            policy_type: response[i].policy_type,
            policy_mode: response[i].policy_mode,
            policy_start_date: response[i].policy_start_date,
            policy_end_date: response[i].policy_end_date,
            premium_amount: response[i].premium_amount,
            category_name: response[i].category_name,
            producer: response[i].producer,
            company_name: response[i].company_name,
          });

          agentData.push({
            name: response[i].firstname,
            email: response[i].email,
            dob: response[i].dob,
            phone: response[i].phone,
            gender: response[i].gender,
            address: {
              street: response[i].address,
              city: response[i].city,
              state: response[i].state,
              zip: response[i].zip,
            },
          });

          accountData.push({
            account_name: response[i].account_name,
            account_type: response[i].account_type,
            policy_number: response[i].policy_number,
          });
        }

        await User.insertMany(userData);
        await Account.insertMany(accountData);
        await Agent.insertMany(agentData);
        await Policy.insertMany(policyData);

        res.status(200).json({
          success: true,
          message: `Data successfully imported from file and  saves to db`,
        });
      });
  } catch (error) {
    res.send({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      dob,
      phone,
      gender,
      usre_type,
      policy_number,
      address,
    } = req.body;

    const user = await User.create({
      name: name,
      email: email,
      dob: dob,
      phone: phone,
      gender: gender,
      policy_number: policy_number,
      address: address,
      usre_type: usre_type,
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    let user = await User.find();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User do not exists",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }

    updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: false,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    await User.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  importCsv,
  deleteUser,
  updateUser,
  getUser,
  getUserById,
};
