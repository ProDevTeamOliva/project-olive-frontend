export const validateUserData = (
  value,
  required,
  amoutOfSignMin2,
  amoutOfSignMax60
) => {
  const error = {};

  if (value.length < 2) {
    error.value = amoutOfSignMin2;
  }
  if (value.length > 60) {
    error.value = amoutOfSignMax60;
  }
  if (!value) {
    error.value = required;
  }
  return error.value;
};
