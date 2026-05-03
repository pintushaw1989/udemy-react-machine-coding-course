import "./App.css";
import Rating from "./components/Rating.jsx";

function App() {
  return (
    <div className="container">
      <h2>Star Rating</h2>
      <Rating numberOfStars={5} />
    </div>
  );
}

export default App;
