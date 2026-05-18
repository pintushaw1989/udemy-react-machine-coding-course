import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const steps = [1, 5, 10, 25, 50, 100];

const App = () => {
  const [count, setCount] = useLocalStorage("count", 0);
  const [step, setStep] = useLocalStorage("step", 1);

  const reset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="counter-app">
      <div className="counter-container">
        <h1>React Counter</h1>
        <p className="count">{count}</p>
        <div className="button-group">
          <button
            aria-label="Decrement Count"
            type="button"
            disabled={count <= 0}
            onClick={() => setCount((prev) => Math.max(prev - step, 0))}
          >
            Decrement
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <button
            aria-label="Increment Count"
            type="button"
            onClick={() => setCount((prev) => prev + step)}
          >
            Increment
          </button>
        </div>
      </div>

      <div className="step-container">
        <p className="step-title">Select Step</p>

        <div className="step-buttons">
          {steps.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setStep(item)}
              className={step === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
