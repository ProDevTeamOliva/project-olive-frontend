export const validatorOfRequired = (required) => (value) => {
  const error = {};

  if (!value || value.length < 2) {
    error.value = required;
  }
  return error.value;
};
