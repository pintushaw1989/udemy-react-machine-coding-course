import "./App.css";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h2>My Themed App</h2>
        <ThemeToggle />
      </header>
      <main>
        <div className="card">
          <h1>React Theme Changer</h1>
          <p>
            Production-ready dark and light mode implementation using React.
          </p>
        </div>
      </main>
    </div>
  );
}
