import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Task } from "../types";
import Header from "../shared/header";
import TaskCard from "../shared/TaskCard";
import FloatingAddButton from "../shared/FloatingAddButton";

type Props = {
  tasks: Task[];
  addTask: (t: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
};

export default function TodoPage({ tasks, updateTask, removeTask }: Props) {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? tasks.filter(t => (t.title + " " + (t.description||"")).toLowerCase().includes(q)) : tasks;
    return {
      pending: filtered.filter(t => t.status === "pending"),
      inprogress: filtered.filter(t => t.status === "inprogress"),
      completed: filtered.filter(t => t.status === "completed"),
    };
  }, [tasks, query]);

  return (
    <>
      <Header title="TODO APP" backTo={null} />
      <main className="page page-left-col">
        <div className="panel">
          <div className="search-row">
            <input
              className="search"
              placeholder="Search To-Do"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="section">
            <h4 className="section-title">Pending ({groups.pending.length})</h4>
            <div className="group">
              {groups.pending.length === 0 ? <div className="empty">No pending tasks</div> :
                groups.pending.map(t => (
                  <TaskCard key={t.id} task={t} onToggle={() => updateTask(t.id, { status: "inprogress" })} onEditLink={`/edit/${t.id}`} onDelete={() => removeTask(t.id)} />
                ))
              }
            </div>
          </div>

          <div className="section">
            <h4 className="section-title">In Progress ({groups.inprogress.length})</h4>
            <div className="group">
              {groups.inprogress.length === 0 ? <div className="empty">No tasks in progress</div> :
                groups.inprogress.map(t => (
                  <TaskCard key={t.id} task={t} onToggle={() => updateTask(t.id, { status: "completed" })} onEditLink={`/edit/${t.id}`} onDelete={() => removeTask(t.id)} />
                ))
              }
            </div>
          </div>

          <div className="section">
            <h4 className="section-title">Completed ({groups.completed.length})</h4>
            <div className="group">
              {groups.completed.length === 0 ? <div className="empty">No completed tasks</div> :
                groups.completed.map(t => (
                  <TaskCard key={t.id} task={t} onToggle={() => updateTask(t.id, { status: "pending" })} onEditLink={`/edit/${t.id}`} onDelete={() => removeTask(t.id)} />
                ))
              }
            </div>
          </div>
        </div>
      </main>

      <FloatingAddButton link="/add" />
    </>
  );
}
