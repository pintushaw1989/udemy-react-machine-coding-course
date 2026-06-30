import { useRef } from "react";
import { useVirtualize } from "../hooks/useVirtualize.js"; // Import your new hook

export default function CustomVariableList({
  items,
  estimatedItemHeight,
  containerHeight,
  overscan = 3,
}) {
  const containerRef = useRef(null);

  // Consume the hook
  const { virtualItems, totalHeight, handleScroll } = useVirtualize({
    items,
    estimatedItemHeight,
    containerHeight,
    overscan,
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${containerHeight}px`,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            height: `${totalHeight}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map(({ item, index, offsetTop, measureRef }) => (
            <div
              key={index}
              ref={measureRef} // The hook handles passing the index down
              style={{
                position: "absolute",
                top: `${offsetTop}px`,
                left: 0,
                width: "100%",
                padding: "16px",
                borderBottom: "1px solid #eee",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
