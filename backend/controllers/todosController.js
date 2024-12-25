const { prisma } = require("../database/db.config");

const createTodo = async (req, res) => {
  try {
    const { title, description, threshold } = req.body;

    // Validate required fields
    if (!title || !description || !threshold) {
      return res.status(400).json({
        message: "All fields are required: title, description, and threshold.",
      });
    }

    // Validate threshold (must be a valid date)
    const parsedThreshold = new Date(threshold);
    if (isNaN(parsedThreshold.getTime())) {
      return res.status(400).json({
        message:
          "Invalid threshold date. Please provide a valid ISO-8601 date.",
      });
    }

    // Create a new todo
    const newTodo = await prisma.todos.create({
      data: {
        username: req.user.username, // Assuming req.user is populated by authentication middleware
        title,
        description,
        threshold: parsedThreshold,
      },
    });

    // Return success response
    return res.status(201).json({
      data: newTodo,
      message: "Task added successfully",
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ message: "Failed to add task", error });
  }
};

const getTodos = async (req, res) => {
  try {
    const username = req.user.username; // Assuming `req.user` is populated via middleware
    const { is_completed, start_date, end_date } = req.query; // Extract query parameters for optional filters

    // Build filters dynamically
    const filters = {
      username,
      is_active: true,
    };

    // Apply optional filters
    if (is_completed !== undefined) {
      filters.is_completed = is_completed === "true"; // Convert to boolean
    }
    if (start_date) {
      filters.threshold = {
        ...(filters.threshold || {}),
        gte: new Date(start_date), // Greater than or equal to start_date
      };
    }
    if (end_date) {
      filters.threshold = {
        ...(filters.threshold || {}),
        lte: new Date(end_date), // Less than or equal to end_date
      };
    }

    // Fetch todos based on filters
    const todos = await prisma.todos.findMany({
      where: filters,
      orderBy: {
        created_at: "desc", // Sort by creation date in descending order
      },
    });

    return res
      .status(200)
      .json({ data: todos, message: "Todos fetched successfully" });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Failed to fetch Todos", error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, title, description, threshold, is_completed } = req.body; // Extract fields from the request body

    // Build the `data` object dynamically to update only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (threshold !== undefined) updateData.threshold = new Date(threshold); // Ensure proper Date format
    if (is_completed !== undefined) updateData.is_completed = is_completed;

    console.log("updated data is --->", updateData);
    // Perform the update
    const todos = await prisma.todos.update({
      where: { id }, // Use `id` to locate the specific Todo
      data: updateData, // Only update the fields provided
    });

    return res
      .status(200)
      .json({ data: todos, message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Failed to update Todo", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body; // Get Todo ID from request parameters

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required." });
    }

    // Check if the todo exists and belongs to the authenticated user
    const todo = await prisma.todos.findUnique({
      where: { id },
    });

    if (!todo || todo.username !== req.user.username) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized to delete." });
    }

    // Soft-delete the todo by setting is_active to false
    const deletedTodo = await prisma.todos.update({
      where: { id },
      data: { is_active: false },
    });

    return res.status(200).json({
      data: deletedTodo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Failed to delete Todo", error });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
