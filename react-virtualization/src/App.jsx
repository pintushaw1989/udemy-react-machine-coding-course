import VirtualizedList from "./components/VirtualizedList";
import "./App.css";

const App = () => {
  const data = Array.from({ length: 1000 }, (_, i) => `Item #${i + 1}`);

  return (
    <div className="app">
      <h1>Virtualized List Fixed Height</h1>
      <VirtualizedList items={data} itemHeight={50} containerHeight={500} />
    </div>
  );
};

export default App;
