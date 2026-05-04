import { useState } from "react";
import { TodoProvider } from "./context/Todo.context";
import type { Todo } from "./context/Todo.context";

export default function App () {

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
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-white min-h-screen py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8 mt-2 tracking-tight">
            Manage Your Todos
          </h1>
          <div className="mb-6">
            <div className="w-full" />
          </div>
          <div className="flex flex-wrap gap-y-3">
            <div className="w-full" />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}