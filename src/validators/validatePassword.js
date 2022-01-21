export const validatePassword = (
  value,
  required,
  amoutOfSignMin8,
  amoutOfSignMax20,
  passwordValidation
) => {
  const error = {};
  if (value.length < 8) {
    error.value = amoutOfSignMin8;
  }
  if (value.length > 20) {
    error.value = amoutOfSignMax20;
  }
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
  if (!re.test(value)) {
    error.value = passwordValidation;
  }
  if (!value) {
    error.value = required;
  }
  return error.value;
};
