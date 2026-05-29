import "./InputField.css";

function InputField({ label, type, name, value, placeholder, onChange, onBlur, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <input
        className="form-input"
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default InputField;
