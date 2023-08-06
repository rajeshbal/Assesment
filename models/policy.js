const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policy_number: {
    type: String,
    required: true,
  },
  policy_type: {
    type: String,
  },
  policy_mode: { type: String },
  company_name: { type: String },
  policy_start_date: { type: String },
  policy_end_date: { type: String },
  premium_amount: {tyee: String},
  category_name: { type: String },
  producer: { type: String },
});

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
