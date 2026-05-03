import React from "react";
import "./Accordion.css";
import { useAccordion } from "../hooks/useAccordion";

const Accordion = ({ data }) => {
  const { selectionType, handleSelect, onOptionChange, isOpen } =
    useAccordion();

  return (
    <div className="wrapper">
      <h1>React Accordion</h1>
      <div>
        {["single", "multi"].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="selection"
              value={type}
              checked={selectionType === type}
              onChange={onOptionChange}
            />
            {type === "single" ? "Single Select" : "Multi Select"}
          </label>
        ))}
      </div>
      {data?.map((item) => (
        <div key={item.id} className="accordion">
          <div
            className="item"
            tabIndex={0}
            role="button"
            aria-expanded={isOpen(item.id)}
            aria-controls={`content-${item.id}`}
            onClick={() => handleSelect(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(item.id);
              }
            }}
          >
            <h3>{item.question}</h3>
            <span>{isOpen(item.id) ? "-" : "+"}</span>
          </div>
          {isOpen(item.id) && (
            <p className={`answer ${isOpen(item.id) ? "open" : ""}`}>
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
