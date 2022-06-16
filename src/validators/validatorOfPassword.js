export const validatorOfPassword =
    (required, amoutOfSignMin8, amoutOfSignMax20, passwordValidation) =>
    value => {
        const error = {};
        const regex = /^\s+$/;

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
        if (!value || regex.test(value)) {
            error.value = required;
        }
        return error.value;
    };
