import Accordion from "./components/Accordion.jsx";
import { accordionData } from "./assets/data";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Accordion data={accordionData} defaultOpenIds={[1, 2]} />
    </div>
  );
}

export default App;
