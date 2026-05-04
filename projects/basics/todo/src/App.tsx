/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { TodoProvider } from "./context/Todo.context";
import type { Todo } from "./context/Todo.context";
import TodoItem from "./components/Todo.item";
import TodoForm from "./components/Todo.form";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, { ...todo, id: Date.now() }]);
  };

  const updateTodo = (id: number, todo: Todo) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...todo } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]") as Todo[];
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              My Todos
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Stay organized. Stay productive.
            </p>
          </div>

          {/* Stats Bar */}
          {total > 0 && (
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3 mb-4 shadow-sm">
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{completed}</span>{" "}
                of <span className="font-semibold text-gray-800">{total}</span>{" "}
                completed
              </span>
              <div className="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 rounded-full transition-all duration-500"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-6">
            {/* Form */}
            <div className="mb-6">
              <TodoForm />
            </div>

            <hr className="border-gray-100 mb-5" />

            {/* Todo List */}
            <div className="flex flex-col gap-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-300 text-4xl mb-3">📋</p>
                  <p className="text-sm text-gray-400 font-medium">
                    No todos yet. Add one above!
                  </p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    title={todo.completed ? "Completed" : "Pending"}
                    className="w-full"
                  >
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {total > 0 && (
              <p className="text-xs text-gray-300 text-center mt-6">
                {total - completed} task{total - completed !== 1 ? "s" : ""}{" "}
                remaining
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
