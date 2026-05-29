import { useState } from "react";
import InputField from "./InputField";
import useFormValidation from "../hooks/useFormValidation";
import "./RegistrationForm.css";

function RegistrationForm() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    validateAndTouch,
  } = useFormValidation();

  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = () => {
    const password = values.password;
    if (!password) return null;

    if (password.length < 9)
      return { text: "Weak", class: "weak", width: "33%" };
    if (password.length < 10)
      return { text: "Medium", class: "medium", width: "66%" };
    return { text: "Strong", class: "strong", width: "100%" };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAndTouch()) {
      return;
    }

    alert("Registration Successful");

    resetForm();
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Register Your Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={values.name}
          placeholder="Enter your name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          placeholder="you@example.com"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />
        {!errors.email && values.email.trim() && touched.email && (
          <p className="success-text">✓ Valid email address</p>
        )}

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
        />
        {values.password && !errors.password && (
          <div className="strength-container">
            <div
              className={`strength-bar strength-${passwordStrength?.class}`}
              style={{ width: passwordStrength?.width }}
            />
            <span className="strength-text">
              {passwordStrength?.text} password
            </span>
          </div>
        )}

        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
        />
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Register
          </button>
          <button type="button" className="reset-btn" onClick={resetForm}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
