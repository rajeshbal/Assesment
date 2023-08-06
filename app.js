const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { isAunthenticated } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const { errorMiddleware } = require("./controllers/error");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", isAunthenticated, userRouter);


app.use(errorMiddleware);

module.exports = app;
