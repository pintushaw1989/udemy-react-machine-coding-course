export default function ItemRow({ item, measureRef }) {
  return (
    <div
      ref={measureRef}
      style={{ padding: "16px 20px", borderBottom: "1px solid #1e2530" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#1a2535",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
            border: "1.5px solid #2a3547",
          }}
        >
          {item.avatar}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              {item.author}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: topicColor(item.topic) + "22",
                color: topicColor(item.topic),
                padding: "2px 7px",
                borderRadius: 3,
                border: `1px solid ${topicColor(item.topic)}44`,
              }}
            >
              {item.topic}
            </span>
            <span
              style={{ fontSize: 11, color: "#4a5568", marginLeft: "auto" }}
            >
              {item.timestamp}
            </span>
          </div>
        </div>
      </div>

      {item.text.map((para, j) => (
        <p
          key={j}
          style={{
            margin: "0 0 8px 0",
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "#94a3b8",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {para}
        </p>
      ))}

      {item.hasCode && (
        <pre
          style={{
            margin: "10px 0",
            padding: "10px 14px",
            background: "#0d1117",
            borderRadius: 6,
            fontSize: 11.5,
            lineHeight: 1.7,
            color: "#79c0ff",
            border: "1px solid #21262d",
            overflowX: "auto",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {item.code}
        </pre>
      )}

      {item.hasTags && item.tags.length > 0 && (
        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}
        >
          {item.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                color: "#64748b",
                background: "#131a27",
                padding: "2px 8px",
                borderRadius: 12,
                border: "1px solid #1e2d42",
              }}
            >
              #{t.toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function topicColor(topic) {
  const map = {
    Engineering: "#60a5fa",
    Design: "#a78bfa",
    Product: "#34d399",
    Marketing: "#fb923c",
    Research: "#f472b6",
    Legal: "#facc15",
    Finance: "#2dd4bf",
  };
  return map[topic] || "#94a3b8";
}
