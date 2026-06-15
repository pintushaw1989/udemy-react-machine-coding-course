import AccordionItem from "./AccordionItem";
import { useAccordion } from "../hooks/useAccordion";
import "./Accordion.css";

const Accordion = ({ data, defaultOpenIds = [] }) => {
  const {
    ACCORDION_TYPES,
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
      <div className="header">
        <h1>React Accordion</h1>
        <div className="controls">
          <div className="radio-group">
            {ACCORDION_TYPES?.map((type) => (
              <label key={type} className="radio-label">
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
      </div>

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
