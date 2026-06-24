import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

import "./AutoComplete.css";

const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    ),
  );
};

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedInput = useDebounce(input, 300);
  const { loading, data: results } = useFetch(debouncedInput);

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;

      case "Enter":
        if (activeIndex >= 0) {
          setInput(results[activeIndex].title);
        }
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      case "Escape":
        setIsOpen(false);
        break;

      default:
        break;
    }
  };
  return (
    <div className="search-container">
      <input
        id="search-input"
        type="text"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `option-${activeIndex}` : undefined
        }
        placeholder="Search anything...."
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          setIsOpen(value.length >= 2);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          if (input.length >= 2) setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div
          className="search-result"
          id="autocomplete-list"
          role="listbox"
          aria-live="polite"
        >
          {loading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            results.map((product, index) => (
              <span
                key={product.id}
                id={`option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "active" : ""}
                onMouseDown={() => {
                  setInput(product.title);
                  setIsOpen(false);
                  setActiveIndex(-1);
                }}
              >
                {highlightText(product.title, input)}
              </span>
            ))
          ) : (
            input.length >= 2 && <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
