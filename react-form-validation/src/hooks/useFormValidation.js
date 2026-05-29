import { useState, useMemo } from "react";
import { validateForm } from "../utils/validation";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function useFormValidation() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    return validateForm(values);
  }, [values]);

  const validateAndTouch = () => {
    const validationErrors = validateForm(values);

    console.log(validationErrors);

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    validateAndTouch,
  };
}

export default useFormValidation;
