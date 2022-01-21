export const validateRepeatPassword = (
  value,
  valuePassword,
  required,
  passwordRepeatValidation
) => {
  const error = {};
  if (value !== valuePassword) {
    error.value = passwordRepeatValidation;
  }

  if (!value) {
    error.value = required;
  }

  return error.value;
};
