require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todos");
const { verifyLoggedInUser } = require("./middlewares/auth");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: "*", // Allow only these methods
  allowedHeaders: "Content-Type", // Allow only these headers
  credentials: true,
};
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/todos", verifyLoggedInUser, todoRouter);

app.listen(PORT, () => console.log("Server Started"));
