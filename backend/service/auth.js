const jwt = require("jsonwebtoken");
const secret = "883xekfq";

function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      username: user.username,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
