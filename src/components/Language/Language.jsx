import { Button, Center, Divider, Flex } from "@chakra-ui/react";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
function Language({ changeLanguage }) {
  const actualLanguage = localStorage.getItem("language");

  return (
    <Flex justify="right" pt="3">
      <Center height="0.75rem" width="130px">
        <Button
          onClick={() => changeLanguage("pl")}
          {...unStyledButton}
          bg="none"
          padding="0"
          fontWeight={actualLanguage === "pl" ? "bold" : "normal"}
        >
          PL
        </Button>
        <Divider
          orientation="vertical"
          color="white"
          border="1px solid white"
          bg="white"
          opacity="1"
          mx="0"
        />
        <Button
          onClick={() => changeLanguage("en")}
          {...unStyledButton}
          bg="none"
          padding="0"
          fontWeight={actualLanguage === "en" ? "bold" : "normal"}
        >
          EN
        </Button>
      </Center>
    </Flex>
  );
}
export default Language;
