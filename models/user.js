const mongoose = require("mongoose");

if (mongoose.connection.models["User"]) {
  delete mongoose.connection.models["User"];
}

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  dob: { type: String },
  phone: { type: String },
  gender: { type: String },
  usre_type: { type: String },
  address: { type: Object },
  nested: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  policy_number: { type: String },
});

const User = global.UserSchema || mongoose.model("User", UserSchema);
module.exports = User;
