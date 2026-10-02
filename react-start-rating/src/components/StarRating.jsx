import { useState, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./StarRating.css";

/**
 * StarRating Component
 * --------------------
 * Uses react-icons (Font Awesome pack) for star rendering.
 * Supports full + half star selection with hover preview.
 */
const StarRating = ({
  totalStars = 5,
  initialRating = 0,
  onChange,
  size = 44,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);
  const starRefs = useRef([]);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  // Pick icon components based on selected set
  const icons = { full: FaStar, half: FaStarHalfAlt, empty: FaRegStar };

  /**
   * Returns the fill state of a star at given index: 'full' | 'half' | 'empty'
   */
  const getStarState = (index) => {
    const starMin = index;
    const starMax = index + 1;

    if (displayRating >= starMax) return "full";
    if (displayRating >= starMax - 0.5) return "half";
    if (displayRating > starMin) {
      // Partial fill (e.g. 0.3) — treat as half if ≥ 0.25, otherwise empty
      return displayRating - starMin >= 0.25 ? "half" : "empty";
    }
    return "empty";
  };

  /**
   * Convert a mouse event on a star into a rating value.
   * Left half → 0.5, right half → 1.0
   */
  const getRatingFromEvent = (e, index) => {
    const starEl = starRefs.current[index];
    if (!starEl) return index + 1;

    const rect = starEl.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const fraction = mouseX / rect.width;

    const value = index + (fraction < 0.5 ? 0.5 : 1);
    return Math.min(value, totalStars);
  };

  const roundToHalf = (value) => Math.round(value * 2) / 2;

  const handleMouseMove = (e, index) => {
    setHoverRating(getRatingFromEvent(e, index));
  };

  const handleClick = (e, index) => {
    const value = roundToHalf(getRatingFromEvent(e, index));
    setRating(value);
    setHoverRating(null);
    if (onChange) onChange(value);
  };

  const handleMouseLeave = () => setHoverRating(null);

  const handleReset = () => {
    setRating(0);
    setHoverRating(null);
    if (onChange) onChange(0);
  };

  const handleKeyDown = (e) => {
    let newValue = rating;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      newValue = roundToHalf(Math.min(rating + 0.5, totalStars));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      newValue = roundToHalf(Math.max(rating - 0.5, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      newValue = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newValue = totalStars;
    } else {
      return;
    }
    setRating(newValue);
    setHoverRating(null);
    if (onChange) onChange(newValue);
  };

  const formatRating = (val) =>
    Number.isInteger(val) ? val.toString() : val.toFixed(1);

  const stars = Array.from({ length: totalStars }, (_, i) => i);

  return (
    <div className="rating-card">
      <h1>Star Rating</h1>

      <div
        className="stars-container"
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        role="radiogroup"
        aria-label="Star rating"
        tabIndex={0}
      >
        {stars.map((index) => {
          const state = getStarState(index);

          // Pick correct icon for current state
          const IconComponent =
            state === "full"
              ? icons.full
              : state === "half"
                ? icons.half
                : icons.empty;

          return (
            <div
              key={index}
              ref={(el) => (starRefs.current[index] = el)}
              className={`star-wrapper star-wrapper--${state}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={(e) => handleClick(e, index)}
              role="radio"
              aria-checked={state === "full"}
              aria-label={`${index + 1} star${index !== 0 ? "s" : ""}`}
            >
              <IconComponent size={size} className="star-icon" />
            </div>
          );
        })}
      </div>

      <div className="rating-value" aria-live="polite">
        {formatRating(displayRating)} <span>/ {totalStars}</span>
      </div>

      <button
        className="reset-btn"
        onClick={handleReset}
        aria-label="Reset rating"
      >
        ↺ Reset
      </button>

      <div className="hint">
        <i>Hover left half = half star</i>
        <i>Use ← → keys</i>
      </div>
    </div>
  );
};

export default StarRating;
