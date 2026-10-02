import { useState } from "react";
import StarRating from "./components/StarRating.jsx";
import "./App.css";

function App() {
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    console.log("User selected rating:", newRating);
    setUserRating(newRating);
  };

  return (
    <div className="app-container">
      <StarRating
        totalStars={5}
        initialRating={0}
        onChange={handleRatingChange}
      />

      <div className="status-panel">
        <p>
          <strong>Selected Rating:</strong>{" "}
          {userRating > 0 ? `${userRating} / 5` : "Not rated yet"}
        </p>
      </div>
    </div>
  );
}

export default App;

// No half rating support
/** 
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
*/
