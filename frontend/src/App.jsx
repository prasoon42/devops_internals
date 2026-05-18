// ============================================
// App.jsx - Main Application Component
// ============================================
// This is the root component of our Todo App.
// It manages all the state and API calls.
// ============================================

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

// --- Backend API URL ---
// In development: http://localhost:5000
// In Docker: uses the environment variable VITE_API_URL
// Vite exposes env variables that start with VITE_ via import.meta.env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  // --- State Variables ---
  const [tasks, setTasks] = useState([]);       // Array of all tasks
  const [loading, setLoading] = useState(true);  // Loading indicator
  const [error, setError] = useState(null);      // Error message

  // --- Fetch All Tasks from Backend ---
  // useEffect runs once when the component first loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch all tasks from the backend API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make GET request to /tasks endpoint
      const response = await fetch(`${API_URL}/tasks`);

      // Check if request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      // Parse JSON response
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Could not connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // --- Add a New Task ---
  const addTask = async (title) => {
    try {
      setError(null);

      // Make POST request with the task title in the body
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Get the newly created task from the response
      const newTask = await response.json();

      // Add it to our local state (so we don't need to refetch everything)
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  // --- Toggle Task Completion ---
  const toggleTask = async (id) => {
    try {
      setError(null);

      // Make PUT request to toggle the task's completed status
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      // Update the task in local state
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  // --- Delete a Task ---
  const deleteTask = async (id) => {
    try {
      setError(null);

      // Make DELETE request to remove the task
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Remove the task from local state
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  // --- Render the UI ---
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">DevOps Lab - Todo Application</p>
      </header>

      <main className="app-main">
        {/* Task Input Form */}
        <TaskForm onAdd={addTask} />

        {/* Error Message */}
        {error && (
          <div className="error-box" id="error-message">
            ⚠️ {error}
            <button className="retry-btn" onClick={fetchTasks}>
              Retry
            </button>
          </div>
        )}

        {/* Task Count */}
        {!loading && !error && (
          <div className="task-stats">
            <span>{tasks.length} total</span>
            <span className="divider">•</span>
            <span className="completed-count">
              {tasks.filter((t) => t.completed).length} completed
            </span>
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="loading" id="loading-indicator">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : (
          /* Task List */
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with React + Express | Backend:{" "}
          <code>{API_URL}</code>
        </p>
      </footer>
    </div>
  );
}

export default App;
