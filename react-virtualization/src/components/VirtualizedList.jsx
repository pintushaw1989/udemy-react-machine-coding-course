import { useRef, useState, useMemo, useCallback } from "react";

const VirtualizedList = ({
  items, // Array of data
  itemHeight = 50, // Fixed height per Item
  containerHeight = 500, // Visible height
  overscan = 3, // Extra item to render above/below viewport
}) => {
  // State for scroll position
  const [scrollTop, setScrollTop] = useState(0);

  // Referance to the container element
  const containerRef = useRef(null);

  // Calculate total height of all items
  const totalHeight = items.length * itemHeight;

  // Calculate which items are visible
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
  );

  // Create array of visible items
  const visibleItems = useMemo(() => {
    const list = [];

    for (let i = startIndex; i <= endIndex; i++) {
      list.push({
        index: i,
        item: items[i],
        offsetTop: i * itemHeight,
      });
    }

    return list;
  }, [items, startIndex, endIndex, itemHeight]);

  // Handle scroll event

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        width: "500px",
        height: containerHeight,
        overflow: "auto",
        border: "1px solid #ccc",
        marginTop: "20px",
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
              left: 0,
              right: 0,
              borderBottom: "1px solid #eee",
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
