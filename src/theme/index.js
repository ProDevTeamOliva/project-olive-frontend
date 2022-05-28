import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    config: { initialColorMode: "dark" },
    styles: {
        global: props => ({
            body: {
                bg: mode("blue.300", "#2b588b")(props),
            },
            "button[class^='react-scroll-to-bottom']": {
                display: "none",
            },
            ".swiper-button-disabled": {
                display: "none",
            },
        }),
    },
});

export default theme;
