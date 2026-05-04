import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo) return;
    addTodo({
      id: Date.now(),
      todo: todo,
      completed: false,
    });
    setTodo("");
  };

  return (
    <form
      onSubmit={handleAdd}
      className="flex items-center w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
    >
      <input
        type="text"
        placeholder="Write a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
      />
      <button
        type="submit"
        className="flex items-center gap-x-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium shrink-0 transition-colors"
      >
        <PlusCircle size={15} />
        Add
      </button>
    </form>
  );
}

export default TodoForm;
