const app = require("./app");
const { connectDb } = require("./data/database");

const port = process.env.PORT || 5000;

connectDb();

app.listen(port, () => {
    console.log("listening on port 5000");
  });