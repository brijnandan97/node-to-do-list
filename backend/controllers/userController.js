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
    return res.json({ status: 200, message: "User authenticated" });
  }
  return res.json({ status: 401, message: "Unauthorised" });
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
