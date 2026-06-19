import AccordionItem from "./AccordionItem";
import { useAccordion } from "../hooks/useAccordion";
import "./Accordion.css";

const Accordion = ({ data, defaultOpenIds = [] }) => {
  const {
    selectionType,
    handleSelect,
    onOptionChange,
    isOpen,
    expandAll,
    collapseAll,
  } = useAccordion(defaultOpenIds);

  const allIds = data?.map((item) => item.id) || [];

  return (
    <div className="wrapper">
      <h1>React Accordion</h1>
      <div className="controls">
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="selection"
              value="single"
              checked={selectionType === "single"}
              onChange={onOptionChange}
            />
            Single Select
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="selection"
              value="multi"
              checked={selectionType === "multi"}
              onChange={onOptionChange}
            />
            Multi Select
          </label>
        </div>

        {selectionType === "multi" && (
          <div className="button-group">
            <button onClick={() => expandAll(allIds)} className="action-btn">
              Expand All
            </button>
            <button onClick={collapseAll} className="action-btn">
              Collapse All
            </button>
          </div>
        )}
      </div>

      {!data?.length && <h3>No items available</h3>}

      {data?.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={isOpen(item.id)}
          onToggle={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
