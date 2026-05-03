import Accordion from "./components/Accordion.jsx";
import data from "./assets/data";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Accordion data={data} />
    </div>
  );
}

export default App;
