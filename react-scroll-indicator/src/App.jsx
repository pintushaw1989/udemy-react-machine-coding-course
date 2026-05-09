import "./App.css";
import ScrollIndicator from "./components/ScrollIndicator";

function App() {
  return (
    <div className="scroll-indigator">
      <ScrollIndicator url="https://dummyjson.com/products?limit=200" />
    </div>
  );
}

export default App;
