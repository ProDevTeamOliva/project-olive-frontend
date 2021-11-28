export const validatePassword = (value, errorMessage) => {
  const error = {};
  if (!value) {
    error.value = errorMessage;
  }
  return error.value;
};
