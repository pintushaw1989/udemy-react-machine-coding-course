import { useState, useRef, useLayoutEffect } from "react";
import "./AccordionItem.css";

const AccordionItem = ({ item, isOpen, onToggle }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  // Use useLayoutEffect to avoid visual flicker
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    setHeight(contentRef.current.scrollHeight);

    // Handle content changes (e.g., dynamic content loading)
    const resizeObserver = new ResizeObserver(() => {
      setHeight(contentRef.current.scrollHeight);
    });

    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [isOpen, item.answer]);

  return (
    <div className="accordion">
      <button
        className="accordion-item"
        aria-expanded={isOpen}
        aria-controls={`content-${item.id}`}
        onClick={onToggle}
      >
        <h3>{item.question}</h3>
        <span className="icon">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        className="answer-container"
        id={`content-${item.id}`}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          transition: "max-height 0.3s ease-out",
        }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="answer-content">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
