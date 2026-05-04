import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [{
        id: nanoid(),
        text: "Hello world",
        completed: false
    }]
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const todo: Todo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) todo.text = action.payload.text;
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        }
    }
});

export const { addTodo, removeTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
export type { Todo };