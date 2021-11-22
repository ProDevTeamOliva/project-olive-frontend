import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: { initialColorMode: "dark" },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.300", "gray.700")(props),
      },
    }),
  },
});

export default theme;
