import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Initialize state directly from localStorage if it exists
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("react-todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.log("localStorage error:", error);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Sync to localStorage whenever 'todos' changes
  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    if (editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: trimmedInput } : todo,
      );

      setTodos(updatedTodos);
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
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo,
    );

    setTodos(updatedTodos);
  };

  const editTodo = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
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
        />

        <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>
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
              >
                {todo.text}
              </span>

              <div className="actions">
                <button onClick={() => editTodo(todo)}>Edit</button>

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
