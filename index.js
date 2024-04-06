const express = require("express");
const app = express();
const userRouter = require("./route/user");
const connect = require("./connection");
const PORT = 6001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
connect(
  "mongodb+srv://bhuppibhai68:CUdLQwXJjve8tZLW@cluster0.nqgatvx.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/user", userRouter);

app.listen(PORT, () => console.log("server connected!", PORT));
