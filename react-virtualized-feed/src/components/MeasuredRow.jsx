import { useRef, useEffect } from "react";
import ItemRow from "./ItemRow";

// --- Measure wrapper ---
export default function MeasuredRow({ index, start, measureItem, item }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      measureItem(index, entry.contentRect.height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [index, measureItem]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        transform: `translateY(${start}px)`,
      }}
    >
      <ItemRow item={item} measureRef={ref} />
    </div>
  );
}
