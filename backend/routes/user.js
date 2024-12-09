const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controllers/userController");

const router = express.Router();

router.get("/signup", handleUserSignup);
router.get("/login", handleUserLogin);

module.exports = router;
