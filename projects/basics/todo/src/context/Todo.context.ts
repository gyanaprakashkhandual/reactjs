/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    updateTodo: (id: number, todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({

    todos: [
        {
            id: 1,
            todo: "Todo message",
            completed: false,
        },
    ],

    addTodo: (todo: Todo) => { },
    updateTodo: (id: number, todo: Todo) => { },
    deleteTodo: (id: number) => { },
    toggleComplete: (id: number) => { },
});




export const useTodo = () => {
    return useContext(TodoContext)
};

export const TodoProvider = TodoContext.Provider;