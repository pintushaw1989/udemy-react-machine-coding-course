import { useVirtualize } from "../hooks/useVirtualize.js";

const VirtualizedList = ({
  items, // Array of data
  itemHeight, // Fixed height per Item
  containerHeight, // Visible height
  overscan = 3, // Extra item to render above/below viewport
}) => {
  // Consume the custom hook
  const { containerRef, handleScroll, totalHeight, visibleItems } =
    useVirtualize({
      items,
      itemHeight,
      containerHeight,
      overscan,
    });

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        width: "500px",
        height: containerHeight,
        overflow: "auto",
        border: "2px solid royalblue",
        marginTop: "20px",
        padding: "2px 10px",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map(({ index, item, offsetTop }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              top: offsetTop,
              height: itemHeight,
              borderBottom: "2px solid whitesmoke",
              borderRadius: "10px",
              backgroundColor: "#333",
              color: "white",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              boxSizing: "border-box",
            }}
          >
            {String(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
