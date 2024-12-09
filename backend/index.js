const express = require("express");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.listen(PORT, () => console.log("Server Started"));
