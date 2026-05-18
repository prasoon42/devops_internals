// ============================================
// TaskList Component
// ============================================
// Renders the list of all tasks.
// Uses the TaskItem component for each individual task.
// Shows a message if there are no tasks.
// ============================================

import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  // Show message when there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="empty-state" id="empty-state">
        <p className="empty-icon">🎉</p>
        <p>No tasks yet! Add one above.</p>
      </div>
    );
  }

  return (
    <ul className="task-list" id="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
