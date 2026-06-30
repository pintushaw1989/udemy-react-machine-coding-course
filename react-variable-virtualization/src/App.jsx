import CustomVariableList from "./components/CustomVariableList";

// Example items generation
const data = Array.from({ length: 1000 }).map((_, i) => {
  const words = "Virtualization is tricky but fun! ".repeat(
    Math.floor(Math.random() * 10) + 1,
  );
  return `Item ${i}: ${words}`;
});

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        React Variable Height Virtualization
      </h1>
      <CustomVariableList
        items={data}
        estimatedItemHeight={50}
        containerHeight={500}
        overscan={3}
      />
    </div>
  );
}
