import React, { useState } from "react";
import "../App.css";

const Tabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!tabs?.length) return null;

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      const next = (index + 1) % tabs.length;
      setSelectedTab(next);
      document.getElementById(`tab-${tabs[next].value}`)?.focus();
    }

    if (e.key === "ArrowLeft") {
      const prev = index === 0 ? tabs.length - 1 : index - 1;
      setSelectedTab(prev);
      document.getElementById(`tab-${tabs[prev].value}`)?.focus();
    }

    if (e.key === "Enter" || e.key === " ") {
      setSelectedTab(index);
    }
  };

  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            role="tab"
            id={`tab-${tab.value}`}
            aria-selected={selectedTab === index}
            aria-controls={`panel-${tab.value}`}
            tabIndex={selectedTab === index ? 0 : -1}
            className={selectedTab === index ? "active" : ""}
            onClick={() => setSelectedTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="tabpanel"
        id={`panel-${tabs[selectedTab].value}`}
        aria-labelledby={`tab-${tabs[selectedTab].value}`}
      >
        {tabs[selectedTab].panel}
      </div>
    </div>
  );
};

export default Tabs;
