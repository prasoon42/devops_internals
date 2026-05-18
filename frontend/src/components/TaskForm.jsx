// ============================================
// TaskForm Component
// ============================================
// A simple form with an input field and a button
// to add new tasks. Uses controlled component pattern.
// ============================================

import { useState } from "react";

function TaskForm({ onAdd }) {
  // State to track what the user types in the input
  const [title, setTitle] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent page reload on form submit
    e.preventDefault();

    // Don't add empty tasks
    if (title.trim() === "") return;

    // Call the parent's addTask function
    onAdd(title);

    // Clear the input field
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} id="task-form">
      <input
        type="text"
        className="task-input"
        id="task-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />
      <button type="submit" className="add-btn" id="add-task-btn">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
