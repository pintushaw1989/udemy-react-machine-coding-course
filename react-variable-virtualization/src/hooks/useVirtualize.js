import { useState, useCallback } from "react";

export function useVirtualize({
  items,
  estimatedItemHeight,
  containerHeight,
  overscan = 3,
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const [positions, setPositions] = useState(() =>
    items.map((_, i) => ({
      index: i,
      height: estimatedItemHeight,
      top: i * estimatedItemHeight,
      bottom: (i + 1) * estimatedItemHeight,
    })),
  );

  const measureElement = useCallback((node, index) => {
    if (node) {
      const measuredHeight = node.offsetHeight;

      setPositions((prevPositions) => {
        const oldHeight = prevPositions[index].height;

        if (measuredHeight === oldHeight) {
          return prevPositions;
        }

        const heightDifference = measuredHeight - oldHeight;
        const newPositions = [...prevPositions];

        newPositions[index] = {
          ...newPositions[index],
          height: measuredHeight,
          bottom: newPositions[index].bottom + heightDifference,
        };

        for (let i = index + 1; i < newPositions.length; i++) {
          newPositions[i] = {
            ...newPositions[i],
            top: newPositions[i].top + heightDifference,
            bottom: newPositions[i].bottom + heightDifference,
          };
        }

        return newPositions;
      });
    }
  }, []);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Calculate visible range based on current scroll position
  let startIndex = 0;
  while (
    startIndex < items.length &&
    positions[startIndex].bottom <= scrollTop
  ) {
    startIndex++;
  }

  let endIndex = startIndex;
  while (
    endIndex < items.length &&
    positions[endIndex].bottom <= scrollTop + containerHeight
  ) {
    endIndex++;
  }

  startIndex = Math.max(0, startIndex - overscan);
  endIndex = Math.min(items.length - 1, endIndex + overscan);

  const totalHeight = positions[items.length - 1]?.bottom || 0;

  // Package the visible items so the consumer component has an easy time rendering
  const virtualItems = items
    .slice(startIndex, endIndex + 1)
    .map((item, indexOffset) => {
      const actualIndex = startIndex + indexOffset;
      return {
        item,
        index: actualIndex,
        offsetTop: positions[actualIndex].top,
        measureRef: (node) => measureElement(node, actualIndex),
      };
    });

  return {
    virtualItems,
    totalHeight,
    handleScroll,
  };
}
