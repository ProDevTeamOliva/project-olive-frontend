import { Center, Divider, Flex } from "@chakra-ui/react";

function Language({ changeLanguage }) {
  return (
    <Flex justify="right" pt="3">
      <Center height="0.75rem" width="130px">
        <button
          className="has-text-white is-size-6"
          onClick={() => changeLanguage("pl")}
        >
          PL
        </button>
        <Divider
          orientation="vertical"
          color="white"
          border="1px solid white"
          bg="white"
          opacity="1"
          mx="2"
        />
        <button
          className="has-text-white is-size-6"
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      </Center>
    </Flex>
  );
}
export default Language;
