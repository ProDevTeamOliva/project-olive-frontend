export const validatorOfRepeatPassword =
  (required, passwordRepeatValidation) => (value, valuePassword) => {
    const error = {};
    if (value !== valuePassword) {
      error.value = passwordRepeatValidation;
    }

    if (!value) {
      error.value = required;
    }

    return error.value;
  };
