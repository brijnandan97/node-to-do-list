const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/", updateTodo);
router.delete("/", deleteTodo);

module.exports = router;
