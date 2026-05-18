// ============================================
// Todo App - Express Backend Server
// ============================================
// This is a simple REST API server for managing tasks.
// It uses an in-memory array to store tasks (no database needed).
// Perfect for a DevOps lab exam demonstration.
// ============================================

const express = require("express");
const cors = require("cors");

// --- Initialize Express App ---
const app = express();

// --- Port Configuration ---
// Uses PORT from environment variable, or defaults to 5000
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// cors() allows the frontend (running on a different port) to talk to this backend
app.use(cors());
// express.json() lets us parse JSON data from incoming requests
app.use(express.json());

// ============================================
// In-Memory Task Storage
// ============================================
// We use a simple array instead of a database.
// NOTE: Data will be lost when the server restarts.
// This is fine for a lab exam demo.
let tasks = [
  { id: 1, title: "Learn Docker basics", completed: false },
  { id: 2, title: "Write Dockerfile for frontend", completed: false },
  { id: 3, title: "Write Dockerfile for backend", completed: false },
];

// Simple counter to generate unique IDs for new tasks
let nextId = 4;

// ============================================
// API ROUTES
// ============================================

// --- Health Check Route ---
// Useful to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running!", status: "OK" });
});

// --- GET /tasks ---
// Returns all tasks
app.get("/tasks", (req, res) => {
  console.log("GET /tasks - Returning all tasks");
  res.json(tasks);
});

// --- POST /tasks ---
// Creates a new task
// Expects JSON body: { "title": "Task name" }
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validate: title must be provided
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Task title is required" });
  }

  // Create new task object
  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  // Add to our array
  tasks.push(newTask);
  console.log(`POST /tasks - Created task: "${newTask.title}" (id: ${newTask.id})`);

  // Return the created task with 201 (Created) status
  res.status(201).json(newTask);
});

// --- PUT /tasks/:id ---
// Toggles the completed status of a task
// The :id in the URL is a route parameter
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  // Find the task by ID
  const task = tasks.find((t) => t.id === taskId);

  // If task not found, return 404
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Toggle the completed status
  task.completed = !task.completed;
  console.log(`PUT /tasks/${taskId} - Toggled completed to: ${task.completed}`);

  // Return the updated task
  res.json(task);
});

// --- DELETE /tasks/:id ---
// Deletes a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  // Find the index of the task
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  // If task not found, return 404
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Remove the task from the array
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  console.log(`DELETE /tasks/${taskId} - Deleted task: "${deletedTask.title}"`);

  // Return success message
  res.json({ message: "Task deleted successfully", task: deletedTask });
});

// ============================================
// Start the Server
// ============================================
app.listen(PORT, () => {
  console.log(`\n🚀 Todo Backend Server is running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 API Endpoints:`);
  console.log(`   GET    /tasks       - Fetch all tasks`);
  console.log(`   POST   /tasks       - Create a new task`);
  console.log(`   PUT    /tasks/:id   - Toggle task completion`);
  console.log(`   DELETE /tasks/:id   - Delete a task\n`);
});
