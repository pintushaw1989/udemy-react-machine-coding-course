import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import "./Rating.css";

const Rating = ({ numberOfStars }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const currentRating = hover || rating;

  const handleClick = (index) => {
    setRating((prev) => (prev === index ? 0 : index));
  };

  return (
    <div className="star-rating" role="radiogroup">
      {[...Array(numberOfStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <FaStar
            className={starValue <= currentRating ? "active" : "inactive"}
            key={starValue}
            onClick={() => {
              handleClick(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            size={40}
            role="radio"
            aria-checked={starValue === rating}
            aria-label={`Rate ${starValue} star`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(starValue);
              }
            }}
            tabIndex={0}
          />
        );
      })}
    </div>
  );
};

export default Rating;
