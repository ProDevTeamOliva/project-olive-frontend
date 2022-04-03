export const validatorOfRequired = (required) => (value) => {
  const error = {};

  if (!value) {
    error.value = required;
  }
  return error.value;
};
