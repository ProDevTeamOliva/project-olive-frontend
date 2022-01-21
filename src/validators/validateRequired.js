export const validateRequired = (value, required) => {
  const error = {};

  if (!value) {
    error.value = required;
  }
  return error.value;
};
