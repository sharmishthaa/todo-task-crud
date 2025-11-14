import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types";

const STORAGE_KEY = "todo_tasks_v1";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  });

  // keep localStorage in sync whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      // ignore
      console.error("Failed to persist tasks", e);
    }
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [task, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateTask, removeTask, setTasks };
}
