import { useState, useRef, useEffect, useId } from "react";
import "./Tooltip.css";

export default function Tooltip({ text, position = "top", delay=300, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  // 1. Create a ref to hold our timer ID
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    // 2. Assign the timer ID to the .current property
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    // 3. Clear the timer using the ref's .current value
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="tooltip-container"
      aria-describedby={tooltipId}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          aria-hidden={!isVisible}
          className={`tooltip-box tooltip-${position}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
