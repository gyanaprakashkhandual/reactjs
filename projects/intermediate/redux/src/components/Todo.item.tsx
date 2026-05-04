import { useState } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useAppDispatch } from "../lib/hooks";
import { removeTodo, editTodo, toggleTodo } from "../lib/features/todo/todo.slice";
import type { Todo } from "../lib/features/todo/todo.slice";

export default function TodoItem({ todo }: { todo: Todo }) {
    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState(todo.text);
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        if (isEditable) {
            dispatch(editTodo({ id: todo.id, text }));
            setIsEditable(false);
        } else {
            setIsEditable(true);
        }
    };

    return (
        <div className={`flex items-center border rounded-xl px-4 py-3 gap-x-3 shadow-sm duration-300 w-full ${
            todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
        }`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="cursor-pointer w-4 h-4 accent-gray-800 shrink-0"
            />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={!isEditable}
                className={`outline-none w-full bg-transparent text-gray-900 text-sm ${
                    isEditable ? "border border-gray-300 rounded-lg px-2 py-1" : "border-transparent"
                } ${todo.completed ? "line-through text-gray-400" : ""}`}
            />
            <button
                onClick={handleEdit}
                disabled={todo.completed}
                className="inline-flex w-8 h-8 rounded-lg border border-gray-200 justify-center items-center bg-white hover:bg-gray-100 text-gray-600 shrink-0 disabled:opacity-40 transition-colors"
            >
                {isEditable ? <Save size={14} /> : <Pencil size={14} />}
            </button>
            <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="inline-flex w-8 h-8 rounded-lg border border-gray-200 justify-center items-center bg-white hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-500 shrink-0 transition-colors"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
}