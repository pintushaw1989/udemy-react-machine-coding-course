import { useState, useRef, useCallback, useMemo } from "react";
import MeasuredRow from "./components/MeasuredRow";
import { useVirtualizer } from "./hooks/useVirtualizer.js";
import {
  generateItems,
  TOPICS,
  ESTIMATED_ITEM_HEIGHT,
} from "./utils/generateItems.js";

const ITEMS = generateItems(10000);

export default function App() {
  const scrollRef = useRef(null);
  const getScrollElement = useCallback(() => scrollRef.current, []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchesTopic = filter === "All" || item.topic === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        item.author.toLowerCase().includes(q) ||
        item.text.some((t) => t.toLowerCase().includes(q));
      return matchesTopic && matchesSearch;
    });
  }, [search, filter]);

  const { virtualItems, totalHeight, measureItem } = useVirtualizer({
    count: filtered.length,
    getScrollElement,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0f1a",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ width: "100%", maxWidth: 720, marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 4,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#e2e8f0",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "-0.02em",
            }}
          >
            feed<span style={{ color: "#3b82f6" }}>://</span>virtualized
          </h1>
          <span
            style={{
              fontSize: 12,
              color: "#334155",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {filtered.length.toLocaleString()} entries
          </span>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#475569" }}>
          Variable-height virtualized list — rendering {virtualItems.length} of{" "}
          {filtered.length.toLocaleString()} items
        </p>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries…"
            style={{
              flex: 1,
              minWidth: 180,
              padding: "8px 14px",
              background: "#111827",
              border: "1px solid #1e2d42",
              borderRadius: 6,
              color: "#e2e8f0",
              fontSize: 13,
              outline: "none",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "#111827",
              border: "1px solid #1e2d42",
              borderRadius: 6,
              color: "#94a3b8",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <option>All</option>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Virtualized List */}
      <div
        ref={scrollRef}
        style={{
          width: "100%",
          maxWidth: 720,
          height: "calc(100vh - 220px)",
          overflowY: "auto",
          background: "#0d1424",
          borderRadius: 10,
          border: "1px solid #1a2535",
          position: "relative",
          scrollbarWidth: "thin",
          scrollbarColor: "#1e2d42 transparent",
        }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {virtualItems.map(({ index, start }) => (
            <MeasuredRow
              key={filtered[index].id}
              index={index}
              start={start}
              measureItem={measureItem}
              item={filtered[index]}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              color: "#334155",
              fontSize: 14,
            }}
          >
            No entries match your filter.
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div
        style={{
          marginTop: 12,
          fontSize: 11,
          color: "#1e3a5f",
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        DOM nodes active: ~{virtualItems.length * 8} · Total rows:{" "}
        {filtered.length.toLocaleString()}
      </div>
    </div>
  );
}
