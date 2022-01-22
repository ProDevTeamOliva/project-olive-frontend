import { Box, HStack, Text, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";
const LinkSearch = ({ id, nameFirst, nameLast, avatar }) => {
  return (
    <Link to={`user/${id}`}>
      <Box
        bg="gray.500"
        w={["300px", "400px"]}
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
      >
        <HStack align="center" h="50px">
          <Flex w="100%" align="center">
            <Image
              boxSize="40px"
              ml="5"
              src={
                "https://cdn.shibe.online/shibes/54e2950bdc7710f2625867582058f940e51f7117.jpg"
              }
              alt={
                "https://cdn.shibe.online/shibes/54e2950bdc7710f2625867582058f940e51f7117.jpg"
              }
              borderRadius="full"
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
};

export default LinkSearch;
