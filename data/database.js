const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "insuredmine";

const connectDb = async () =>
  mongoose
    .connect(connectionString, {
      dbName: dbName,
    })
    .then(() => console.log('database connected'))
    .catch((e) => console.log(e));
    
module.exports = { connectDb };
