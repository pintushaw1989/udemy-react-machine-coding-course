import { useState, useEffect, useCallback } from "react";
import "./App.css";

const STORAGE_KEY = "react-todos";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("localStorage error:", error);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  }, [todos]);

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
  }, [input, editId]);

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const editTodo = useCallback((todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  }, []);

  const cancelEdit = useCallback(() => {
    setInput("");
    setEditId(null);
  }, []);

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
