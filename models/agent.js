const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: { type: String },
  phone: { type: String },
  gender: { type: String },
  address: { type: Object },
  nested: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  passwod: String,
});

const Agent = mongoose.model("Agent", agentSchema);
module.exports = Agent;
