import ChipsInput from "./components/ChipsInput";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [chips, setChips] = useLocalStorage("skills", []);

  return (
    <div className="app">
      <h1>React Chips Input</h1>

      <ChipsInput value={chips} onChange={setChips} maxChips={15} />

      {/* <pre>{JSON.stringify(chips, null, 2)}</pre> */}
    </div>
  );
}

export default App;
