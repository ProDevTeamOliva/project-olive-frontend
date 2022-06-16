export const validatorOfRepeatPassword =
    (required, passwordRepeatValidation) => (value, valuePassword) => {
        const error = {};
        const regex = /^\s+$/;

        if (value !== valuePassword) {
            error.value = passwordRepeatValidation;
        }

        if (!value || regex.test(value)) {
            error.value = required;
        }

        return error.value;
    };
