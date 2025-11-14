import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./components/TodoPage";
import AddTodoPage from "./components/AddTodoPage";
import EditTodoPage from "./components/EditTodoPage";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  // single source of truth
  const tasksHook = useTasks();

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<TodoPage {...tasksHook} />} />
        <Route path="/add" element={<AddTodoPage {...tasksHook} />} />
        <Route path="/edit/:id" element={<EditTodoPage {...tasksHook} />} />
      </Routes>
    </div>
  );
}
