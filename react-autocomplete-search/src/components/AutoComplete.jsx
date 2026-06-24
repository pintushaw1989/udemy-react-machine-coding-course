import { useState, useRef, useEffect, useMemo } from "react";
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
  const containerRef = useRef(null);

  const debouncedInput = useDebounce(input, 300);
  const { loading, data: results } = useFetch(debouncedInput);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll active option into view
  useEffect(() => {
    if (activeIndex >= 0) {
      const activeElement = document.getElementById(`option-${activeIndex}`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      if (results.length > 0) {
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    if (results.length === 0) {
      if (e.key === "Escape") setIsOpen(false);
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
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          setInput(results[activeIndex].title);
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  const highlightedResults = useMemo(() => {
    return results.map((product) => ({
      ...product,
      highlighted: highlightText(product.title, input),
    }));
  }, [results, input]);

  return (
    <div className="search-container" ref={containerRef}>
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
        aria-label="Search"
        placeholder="Search anything..."
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
          ) : highlightedResults.length > 0 ? (
            highlightedResults.map((product, index) => (
              <span
                key={product.id}
                id={`option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "active" : ""}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setInput(product.title);
                  setIsOpen(false);
                  setActiveIndex(-1);
                }}
              >
                {product.highlighted}
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
