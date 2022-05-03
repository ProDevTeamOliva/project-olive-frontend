import { Box, HStack, Text, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";

function LinkSearchForUser({ id, nameFirst, nameLast, avatar, onClose }) {
  return (
    <Link to={`/user/${id}`} params={{ id: id }} onClick={() => onClose()}>
      <Box
        bg="gray.500"
        w="100%"
        h="50px"
        shadow="md"
        borderRadius="10px"
        _focus={{ bg: "gray.600" }}
        _hover={{
          bg: "gray.600",
        }}
        _active={{
          bg: "gray.600",
        }}
        mb="7px"
      >
        <HStack align="center" h="50px">
          <Flex w="100%" align="center">
            <Avatar
              boxSize="40px"
              ml="5"
              src={avatar}
              alt={avatar}
              bg="gray.700"
            />
            <Text textAlign="left" pl="20px" w="100%">
              {nameFirst} {nameLast}
            </Text>
          </Flex>
          <Flex justify="right" w="100%">
            <Text mr="15px" fontWeight="bold">
              <BsArrow90DegLeft
                color="white"
                style={{ strokeWidth: "1" }}
              ></BsArrow90DegLeft>
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Link>
  );
}

export default LinkSearchForUser;