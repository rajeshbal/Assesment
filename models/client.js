const mongoose = require("mongoose");

// if (mongoose.connection.models['User']) {
//     delete mongoose.connection.models['User'];
//   }

const ClientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
