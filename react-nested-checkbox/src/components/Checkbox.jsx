import { useRef, useEffect } from "react";
import "./Checkbox.css";

export const Checkbox = ({
  id,
  label,
  checked,
  indeterminate,
  onChange,
  depth = 0,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    onChange(id, newChecked);
  };

  return (
    <label className={`checkbox-wrapper depth-${depth}`}>
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        onChange={handleChange}
        aria-label={label}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox;
