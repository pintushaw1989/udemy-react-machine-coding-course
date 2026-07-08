import { useState, useCallback, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import "./App.css";

const STORAGE_KEY = "react-todos";

function App() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setTodos(todos);
  }, [todos, setTodos]);

  const addTodo = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (editId) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editId ? { ...todo, text: trimmedInput } : todo,
        ),
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: trimmedInput,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    setInput("");
  }, [input, editId, setTodos]);

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editTodo = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const cancelEdit = () => {
    setInput("");
    setEditId(null);
  };

  return (
    <div className="app">
      <h1>React Todo App</h1>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Enter todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>
        {editId && <button onClick={cancelEdit}>Cancel</button>}
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No Todos Available</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <span
                onClick={() => toggleComplete(todo.id)}
                className={todo.completed ? "completed" : ""}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleComplete(todo.id)}
              >
                {todo.text}
              </span>

              <div className="actions-btn">
                <button className="edit-btn" onClick={() => editTodo(todo)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
