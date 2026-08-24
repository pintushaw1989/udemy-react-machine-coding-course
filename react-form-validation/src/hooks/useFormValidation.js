import { useState, useMemo } from "react";
import { validateForm } from "../utils/validation";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useFormValidation = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    return validateForm(values);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    console.log(name);

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

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
};

export default useFormValidation;
