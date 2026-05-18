// ============================================
// TaskItem Component
// ============================================
// Renders a single task with checkbox, title, and delete button.
// ============================================

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`} id={`task-${task.id}`}>
      <div className="task-content" onClick={() => onToggle(task.id)}>
        <span className="checkbox">{task.completed ? "✅" : "⬜"}</span>
        <span className="task-title">{task.title}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        title="Delete task"
        id={`delete-btn-${task.id}`}
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskItem;
