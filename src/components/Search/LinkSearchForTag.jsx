import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LinkSearchForTag({ tag, onClose }) {
  return (
    <Link to={`/posts/${tag}`} params={{ tag: tag }} onClick={() => onClose()}>
      <Grid
        templateColumns="100%"
        bgGradient="linear(to-r,gray.800, gray.600, gray.400)"
        w="100%"
        minH="50px"
        shadow="md"
        borderRadius="20px"
        _hover={{
          bgGradient: "linear(to-r,gray.900, gray.700, gray.400)",
        }}
        mb="10px"
      >
        <GridItem colStart="1" colEnd="2">
          <Flex flexDirection="row" align="center" h="100%" w="100%">
            <Text textAlign="left" px="20px" fontSize="25px" w="100%">
              #{tag}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Link>
  );
}

export default LinkSearchForTag;
