export const validatorOfContent = (required, maxSizeOfContent) => value => {
    const error = {};
    const regex = /^\s+$/;

    if (!value || regex.test(value)) {
        error.value = required;
    }
    if (value.length > 1024) {
        error.value = maxSizeOfContent;
    }
    return error.value;
};
