import Tooltip from "./components/Tooltip";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h2>Dashboard Layout Demo</h2>

      <div className="demo">
        {/* Left Tooltip */}
        <Tooltip text="Left" position="left">
          <button className="btn">Tooltip Left</button>
        </Tooltip>

        {/* Top Tooltip */}
        <Tooltip text="Top">
          <button className="btn" style={{ background: "#dc3545" }}>
            Tooltip Top
          </button>
        </Tooltip>

        {/* Bottom Tooltip */}
        <Tooltip text="Bottom" position="bottom">
          <button className="btn" style={{ background: "#dc3545" }}>
            Tooltip Bottom
          </button>
        </Tooltip>

        {/* Right Tooltip on an Icon/Emoji */}
        <Tooltip text="Right" position="right">
          <span className="btn">Tooltip Right</span>
        </Tooltip>
      </div>
    </div>
  );
}
