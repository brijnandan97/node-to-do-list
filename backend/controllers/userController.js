const { prisma } = require("../database/db.config");

const handleUserSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({ status: 400, message: "Email already exists!" });
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newUser,
    message: "User created successfully",
  });
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (findUser) {
    return res.json({ status: 200, message: "User authenticated" });
  }
  return res.json({ status: 401, message: "Unauthorised" });
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
