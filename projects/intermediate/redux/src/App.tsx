import { Provider } from "react-redux";
import { store } from "./lib/store";
import { useAppSelector } from "./lib/hooks";
import TodoForm from "./components/Todo.form";
import TodoItem from "./components/Todo.item";

function TodoApp() {
  const todos = useAppSelector((state) => state.todo.todos);
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Todos
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Stay organized. Stay productive.
          </p>
        </div>

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

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-6">
          <div className="mb-6">
            <TodoForm />
          </div>
          <hr className="border-gray-100 mb-5" />
          <div className="flex flex-col gap-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-4xl mb-3">📋</p>
                <p className="text-sm text-gray-400 font-medium">
                  No todos yet. Add one above!
                </p>
              </div>
            ) : (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
          {total > 0 && (
            <p className="text-xs text-gray-300 text-center mt-6">
              {total - completed} task{total - completed !== 1 ? "s" : ""}{" "}
              remaining
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
