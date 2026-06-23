import { useEffect, useReducer } from "react";
import "./App.css";
import { counterReducer, initialState } from "./reducers/counterReducer";
import { ActionTypes } from "./reducers/actionTypes";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [savedState, setSavedState] = useLocalStorage("counter", initialState);
  const [state, dispatch] = useReducer(counterReducer, savedState);
  const { present, past, future } = state;

  const increment = () => dispatch({ type: ActionTypes.INCREMENT });
  const decrement = () => dispatch({ type: ActionTypes.DECREMENT });
  const incrementBy = (num) =>
    dispatch({ type: ActionTypes.INCREMENT_BY, payload: num });
  const undo = () => dispatch({ type: ActionTypes.UNDO });
  const redo = () => dispatch({ type: ActionTypes.REDO });
  const reset = () => dispatch({ type: ActionTypes.RESET });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrl = event.ctrlKey;

      if (!isCtrl) return;

      // Ctrl + Z => Undo
      if (event.key.toLowerCase() === "z") {
        event.preventDefault();

        if (past.length > 0) {
          dispatch({ type: ActionTypes.UNDO });
        }
      }

      // Ctrl + Y => Redo
      if (event.key.toLowerCase() === "y") {
        event.preventDefault();

        if (future.length > 0) {
          dispatch({ type: ActionTypes.REDO });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [past.length, future.length]);

  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  return (
    <div className="app">
      <div className="counter-container">
        <h1>Counter with Undo/Redo</h1>

        <div className="counter-value">
          <span className="counter-number">{present}</span>
        </div>

        <div className="button-group">
          <button
            onClick={decrement}
            className="btn btn-danger"
            disabled={present <= 0}
          >
            -1
          </button>
          <button onClick={increment} className="btn btn-success">
            +1
          </button>
        </div>

        <div className="button-group">
          <button onClick={() => incrementBy(5)} className="btn btn-primary">
            +5
          </button>
          <button onClick={() => incrementBy(10)} className="btn btn-primary">
            +10
          </button>
        </div>

        <div className="button-group">
          <button
            onClick={undo}
            disabled={past.length === 0}
            className="btn btn-warning"
          >
            Undo ({past.length}) ctrl+z
          </button>
          <button
            onClick={redo}
            disabled={future.length === 0}
            className="btn btn-info"
          >
            Redo ({future.length}) ctrl+y
          </button>
        </div>

        <div className="button-group">
          <button onClick={reset} className="btn btn-secondary">
            Reset Counter
          </button>
        </div>

        <div className="history-section">
          <h3>History Stack</h3>
          <div className="history-stack">
            <div className="past-history">
              <strong>Past:</strong>
              {past.length > 0 ? past.join(" → ") : "Empty"}
            </div>
            <div className="present-display">
              <strong>Present:</strong> {present}
            </div>
            <div className="future-history">
              <strong>Future:</strong>
              {future.length > 0 ? future.join(" → ") : "Empty"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
