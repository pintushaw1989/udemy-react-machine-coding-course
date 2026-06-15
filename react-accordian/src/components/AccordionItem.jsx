import { useState, useRef, useLayoutEffect } from "react";

const AccordionItem = ({ item, isOpen, onToggle }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  // Use useLayoutEffect to avoid visual flicker
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    if (!isOpen) {
      setHeight(0);
      return;
    }

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
        className="item"
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
        style={{ maxHeight: `${height}px` }}
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
