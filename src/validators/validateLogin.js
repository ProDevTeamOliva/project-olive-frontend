export const validateLogin = (
  value,
  required,
  amoutOfSignMin2,
  amoutOfSignMax20
) => {
  const error = {};

  if (value.length < 2) {
    error.value = amoutOfSignMin2;
  }
  if (value.length > 20) {
    error.value = amoutOfSignMax20;
  }
  if (!value) {
    error.value = required;
  }
  return error.value;
};
