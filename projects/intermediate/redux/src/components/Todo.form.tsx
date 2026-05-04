import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useAppDispatch } from "../lib/hooks";
import { addTodo } from "../lib/features/todo/todo.slice";

export default function TodoForm() {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(addTodo(text.trim()));
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a new todo..."
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