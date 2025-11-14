import React from "react";
import type { Task } from "../types";
import { Link } from "react-router-dom";

type Props = {
  task: Task;
  onToggle: () => void; // toggles to next status
  onDelete: () => void;
  onEditLink: string;
};

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function TaskCard({ task, onToggle, onDelete, onEditLink }: Props) {
  const statusLabel = task.status === "pending" ? "Pending" : task.status === "inprogress" ? "In Progress" : "Completed";
  return (
    <div className="task-card" data-status={task.status}>
      <div className="task-left">
        <button className="status-btn" onClick={onToggle} title="Move to next status">
          {task.status === "pending" && "Start"}
          {task.status === "inprogress" && "Done"}
          {task.status === "completed" && "Reset"}
        </button>
      </div>

      <div className="task-body">
        <div className="task-top">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">{statusLabel}</div>
        </div>
        <div className="task-desc">{task.description}</div>
        <div className="task-footer">
          <small className="muted">Created {formatDate(task.createdAt)}</small>
          <div className="task-actions">
            <Link to={onEditLink} className="icon">✏️</Link>
            <button className="icon danger" onClick={onDelete}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
