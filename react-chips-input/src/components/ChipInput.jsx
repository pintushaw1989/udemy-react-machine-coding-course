import { useState, useRef, useCallback } from "react";
import "./ChipInput.css";

export default function ChipsInput({
  value = [],
  onChange = () => {},
  placeholder = "Add tag...",
  maxChips = 10,
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  const addChip = useCallback(
    (chip) => {
      const trimmed = chip.trim();

      if (!trimmed) return;

      if (value.includes(trimmed)) {
        setError("Chip already exists");
        return;
      }

      if (value.length >= maxChips) {
        setError(`Maximum ${maxChips} chips allowed`);
        return;
      }

      setError("");
      onChange([...value, trimmed]);
      setInput("");
    },
    [value, onChange, maxChips],
  );

  const removeChip = (chip) => {
    onChange(value.filter((item) => item !== chip));
    setError("");
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addChip(input);
      }

      if (e.key === "Backspace" && !input && value.length) {
        e.preventDefault();
        const lastChip = value[value.length - 1];
        onChange(value.slice(0, -1));
        setInput(lastChip);
      }
    },
    [input, addChip, value, onChange],
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      const chips = pasted
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean);

      const unique = chips.filter((item) => !value.includes(item));
      const newChips = [...value, ...unique];

      if (newChips.length > maxChips) {
        setError(`Only ${maxChips - value.length} chips can be added`);
      } else {
        setError("");
      }

      onChange(newChips.slice(0, maxChips));
    },
    [value, onChange, maxChips],
  );

  return (
    <div
      className="chip-input-container"
      onClick={() => inputRef.current.focus()}
    >
      <div className="chips">
        {value.map((chip, index) => (
          <div key={`${chip}-${index}`} className="chip">
            <span>{chip}</span>
            <button
              aria-label={`Remove ${chip}`}
              onClick={() => removeChip(chip)}
            >
              ×
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          value={input}
          placeholder={placeholder}
          aria-label="Chip Input"
          onPaste={handlePaste}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="chip-count">
        {value.length}/{maxChips}
      </div>
    </div>
  );
}
