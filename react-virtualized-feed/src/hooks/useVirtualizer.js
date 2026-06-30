/* eslint-disable react-hooks/refs */
import { useMemo, useState, useEffect, useRef, useCallback } from "react";

// --- Virtualized List Core ---
const OVERSCAN = 5;

export function useVirtualizer({ count, getScrollElement, estimateSize }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);
  const measuredHeights = useRef({});
  const [version, forceUpdate] = useState(0);

  useEffect(() => {
    const el = getScrollElement();
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height);
    });
    ro.observe(el);
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [getScrollElement]);

  const measureItem = useCallback((index, height) => {
    if (measuredHeights.current[index] !== height) {
      measuredHeights.current[index] = height;
      forceUpdate((n) => n + 1);
    }
  }, []);

  const offsets = useMemo(() => {
    const arr = new Float64Array(count + 1);
    for (let i = 0; i < count; i++) {
      arr[i + 1] = arr[i] + (measuredHeights.current[i] ?? estimateSize(i));
    }
    return arr;
  }, [count, estimateSize, version]);

  const totalHeight = offsets[count];

  // Binary search for start index
  const startIndex = useMemo(() => {
    let lo = 0,
      hi = count - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (offsets[mid + 1] <= scrollTop) lo = mid + 1;
      else hi = mid;
    }
    return Math.max(0, lo - OVERSCAN);
  }, [offsets, scrollTop, count]);

  const endIndex = useMemo(() => {
    let lo = startIndex,
      hi = count - 1;
    const bottom = scrollTop + containerHeight;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (offsets[mid] < bottom) lo = mid;
      else hi = mid - 1;
    }
    return Math.min(count - 1, lo + OVERSCAN);
  }, [offsets, scrollTop, containerHeight, startIndex, count]);

  const virtualItems = useMemo(() => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        start: offsets[i],
        size: offsets[i + 1] - offsets[i],
      });
    }
    return items;
  }, [startIndex, endIndex, offsets]);

  return { virtualItems, totalHeight, measureItem, scrollTop };
}
