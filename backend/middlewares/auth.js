const { getUser } = require("../service/auth");

async function verifyLoggedInUser(req, res, next) {
  const userUid = req.cookies.uid;

  if (!userUid) return res.json({ status: 401, message: "Unauthorized user" });
  const user = getUser(userUid);

  if (!user) return res.json({ status: 401, message: "Invalid user" });
  req.user = user;
  next();
}

module.exports = {
  verifyLoggedInUser,
};
