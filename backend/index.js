const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const TodoModel = require("./models/createTodo.model");

const app = express();
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "https://pepsales-interview-assignment-frontend.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/create-todo", async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name) {
      return res.status(201).json({
        message: "Name is required",
        success: false,
        error: true,
      });
    }

    const todo = new TodoModel({
      name,
      status,
    });

    await todo.save();
    res.status(201).json({
      message: "Todo created successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
});

app.get("/all-todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json({
      message: "Todos fetched successfully",
      success: true,
      error: false,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
});

app.patch("/update-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      error: false,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
});

app.delete("/delete-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Hello Nageshwar You are Connected to MongoDB");
    console.log("Server is running on port", PORT);
  });
});
