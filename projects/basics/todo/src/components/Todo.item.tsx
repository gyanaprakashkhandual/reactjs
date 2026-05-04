import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTodo } from "../context";
import type { Todo } from "../context/Todo.context";

function TodoItem({ todo }: { todo: Todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border rounded-xl px-4 py-3 gap-x-3 shadow-sm duration-300 w-full ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer w-4 h-4 accent-gray-800 shrink-0"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`outline-none w-full bg-transparent text-gray-900 text-sm ${
          isTodoEditable
            ? "border border-gray-300 rounded-lg px-2 py-1"
            : "border-transparent"
        } ${todo.completed ? "line-through text-gray-400" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <button
        className="inline-flex w-8 h-8 rounded-lg border border-gray-200 justify-center items-center bg-white hover:bg-gray-100 text-gray-600 shrink-0 disabled:opacity-40 transition-colors"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <Save size={14} /> : <Pencil size={14} />}
      </button>

      <button
        className="inline-flex w-8 h-8 rounded-lg border border-gray-200 justify-center items-center bg-white hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-500 shrink-0 transition-colors"
        onClick={() => deleteTodo(todo.id)}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default TodoItem;
