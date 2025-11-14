import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/header";
import type { Task } from "../types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  tasks: Task[];
  addTask: (t: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
};

export default function AddTodoPage({ addTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleAdd() {
    if (!title.trim()) return;
    const task: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: Date.now(),
    };
    addTask(task);
    navigate("/");
  }

  return (
    <>
      <Header title="Add Task" backTo="/" />
      <main className="page page-left-col">
        <div className="panel narrow">
          <div className="form-row">
            <label>Enter the title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Enter the description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
          </div>

          <div className="form-actions">
            <button className="btn ghost" onClick={() => navigate("/")}>Cancel</button>
            <button className="btn primary" onClick={handleAdd}>ADD</button>
          </div>
        </div>
      </main>
    </>
  );
}
