import { useState } from "react";
import "./Tabs.css";

const Tabs = ({ tabs, defaultActiveId }) => {
  // State: which tab is currently active
  const [activeTabId, setActiveTabId] = useState(
    defaultActiveId || (tabs.length > 0 ? tabs[0].id : null)
  );

  // Find the active tab object from the config
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="tabs-container">
      {/* Tab Buttons (Navigation) */}
      <div className="tabs-header" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTabId === tab.id}
            className={`tab-button ${
              activeTabId === tab.id ? "active" : ""
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content (Conditional Rendering) */}
      <div className="tab-content" role="tabpanel">
        {activeTab ? activeTab.content : <p>No tab selected</p>}
      </div>
    </div>
  );
}

export default Tabs;