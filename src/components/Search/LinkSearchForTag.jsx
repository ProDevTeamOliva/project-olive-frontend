import { Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LinkSearchForTag({ tag, onClose }) {
  return (
    <Link to={`/posts/${tag}`} params={{ tag: tag }} onClick={() => onClose()}>
      <Box
        bg="gray.500"
        w="100%"
        h="45px"
        shadow="md"
        borderRadius="25px"
        _focus={{ bg: "gray.600" }}
        _hover={{
          bg: "gray.600",
        }}
        _active={{
          bg: "gray.600",
        }}
        mb="7px"
      >
        <HStack align="center" h="45px">
          <Text textAlign="left" pl="20px" w="100%" fontSize="25px">
            #{tag}
          </Text>
        </HStack>
      </Box>
    </Link>
  );
}

export default LinkSearchForTag;
