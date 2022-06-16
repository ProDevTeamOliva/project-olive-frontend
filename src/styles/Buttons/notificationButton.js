export const notificationButton = (color1, color2) => {
    return {
        variant: "unstyled",
        fontSize: "18px",
        color: color1,
        _focus: { color: color2 },
        _hover: {
            color: color2,
        },
        _active: {
            color: color2,
        },
    };
};
