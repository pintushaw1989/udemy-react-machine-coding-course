import { useRef, useState, useMemo, useCallback } from "react";

export const useVirtualize = ({
  items,
  itemHeight,
  containerHeight,
  overscan = 3,
}) => {
  // State for scroll position
  const [scrollTop, setScrollTop] = useState(0);

  // Reference to the scrollable container element
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
      // Safety check to ensure we don't try to render undefined items
      if (i >= 0 && i < items.length) {
        list.push({
          index: i,
          item: items[i],
          offsetTop: i * itemHeight,
        });
      }
    }

    return list;
  }, [items, startIndex, endIndex, itemHeight]);

  // Handle scroll event
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    containerRef,
    handleScroll,
    totalHeight,
    visibleItems,
  };
};
