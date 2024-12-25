const { prisma } = require("../database/db.config");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.status(400).json({ message: "Email already exists!" });
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  return res.status(200).json({
    data: newUser,
    message: "User created successfully",
  });
};

const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });

  if (user) {
    const token = setUser(user);
    console.log("token is ", token);
    res.cookie("uid", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: false, // Set to true if using HTTPS
      sameSite: "None", // Adjust to your needs ('lax', 'strict', 'none')
      path: "/",
    });
    return res.status(200).json({ message: "User authenticated" });
  }
  return res.status(401).json({ message: "Unauthorised" });
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
