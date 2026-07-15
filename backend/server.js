
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());


let tasks = [
  { id: 1, title: "Learn Docker basics", completed: false },
  { id: 2, title: "Write Dockerfile for frontend", completed: false },
  { id: 3, title: "Write Dockerfile for backend", completed: false },
];

let nextId = 4;

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running!", status: "OK" });
});

app.get("/tasks", (req, res) => {
  console.log("GET /tasks - Returning all tasks");
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;


  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Task title is required" });
  }


  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };


  tasks.push(newTask);
  console.log(`POST /tasks - Created task: "${newTask.title}" (id: ${newTask.id})`);


  res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  console.log(`PUT /tasks/${taskId} - Toggled completed to: ${task.completed}`);

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  console.log(`DELETE /tasks/${taskId} - Deleted task: "${deletedTask.title}"`);

  res.json({ message: "Task deleted successfully", task: deletedTask });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Todo Backend Server is running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 API Endpoints:`);
  console.log(`   GET    /tasks       - Fetch all tasks`);
  console.log(`   POST   /tasks       - Create a new task`);
  console.log(`   PUT    /tasks/:id   - Toggle task completion`);
  console.log(`   DELETE /tasks/:id   - Delete a task\n`);
});
