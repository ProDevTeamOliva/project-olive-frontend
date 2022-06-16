export const validatorOfLogin =
    (required, amoutOfSignMin2, amoutOfSignMax20) => value => {
        const error = {};
        const regex = /^\s+$/;

        if (value.length < 2) {
            error.value = amoutOfSignMin2;
        }
        if (value.length > 20) {
            error.value = amoutOfSignMax20;
        }
        if (!value || regex.test(value)) {
            error.value = required;
        }
        return error.value;
    };
