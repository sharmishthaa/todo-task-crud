import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../shared/header";
import type { Task, Status } from "../types";

type Props = {
  tasks: Task[];
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  addTask: (t: Task) => void;
};

export default function EditTodoPage({ tasks, updateTask }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === id) ?? null;

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<Status>(task?.status ?? "pending");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setStatus(task.status);
    }
  }, [task]);

  if (!task) {
    return (
      <>
        <Header title="Edit Task" backTo="/" />
        <main className="page page-left-col">
          <div className="panel narrow">
            <div className="empty">Task not found</div>
            <div className="form-actions">
              <button className="btn" onClick={() => navigate("/")}>Back</button>
            </div>
          </div>
        </main>
      </>
    );
  }

  function handleUpdate() {
    if (!title.trim()) return;
    updateTask(task?.id ?? "", { title: title.trim(), description: description.trim(), status });
    navigate("/");
  }

  return (
    <>
      <Header title="Edit Task" backTo="/" />
      <main className="page page-left-col">
        <div className="panel narrow">
          <div className="form-row">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
          </div>

          <div className="form-row">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="btn ghost" onClick={() => navigate("/")}>Cancel</button>
            <button className="btn primary" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </main>
    </>
  );
}
