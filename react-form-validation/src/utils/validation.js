export const validateForm = (values) => {
  const errors = {};

  // Name
  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  // Email
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email";
    }
  }

  // Password
  if (!values.password) {
    errors.password = "Password is required";
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Must contain uppercase, lowercase and number";
    }
  }

  // Confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
