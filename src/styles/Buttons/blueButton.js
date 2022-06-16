export const universalButtonStyle = (colorFirst, colorSecond) => ({
    w: "100%",
    color: "white",
    fontSize: "120%",
    letterSpacing: "1.5px",
    bg: colorFirst,
    borderColor: colorSecond,
    _focus: { borderColor: colorSecond },
    _hover: {
        bg: colorSecond,
        color: "white",
        fontWeight: "bold",
    },
    _active: {
        bg: colorSecond,
        color: "white",
        fontWeight: "bold",
    },

    borderRadius: "1.25em",
    shadow: "1px 0px 3px 1px #1A365D",
});
