import { useState, useRef } from "react";
import "./ChipsInput.css";

export default function ChipsInput({
  value,
  onChange,
  placeholder = "Add tag...",
  maxChips = 10,
}) {
  const [input, setInput] = useState("");

  const inputRef = useRef();

  const isValidChip = (chip) => /^[a-zA-Z ]+$/.test(chip);

  const addChip = (chip) => {
    const trimmed = chip.trim();

    if (!trimmed) return;

    if (!isValidChip(trimmed)) return;

    if (value.includes(trimmed)) return;

    if (value.length >= maxChips) return;

    onChange([...value, trimmed]);

    setInput("");
  };

  const removeChip = (chip) => {
    onChange(value.filter((item) => item !== chip));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(input);
    }

    if (e.key === "Backspace" && !input && value.length) {
      const lastChip = value[value.length - 1];

      onChange(value.slice(0, -1));
      setInput(lastChip);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");

    const chips = pasted
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => isValidChip(item));

    const unique = chips.filter((item) => !value.includes(item));

    onChange([...value, ...unique].slice(0, maxChips));
  };

  return (
    <>
      <div className="chips-container" onClick={() => inputRef.current.focus()}>
        {value.map((chip) => (
          <div key={chip} className="chip">
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

      <div className="chip-count">
        {value.length}/{maxChips}
      </div>
    </>
  );
}
