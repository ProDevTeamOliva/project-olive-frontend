import { Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LinkSearchForTag({ tag, onClose }) {
    return (
        <Link
            to={`/posts/${tag}`}
            params={{ tag: tag }}
            onClick={() => onClose()}>
            <Grid
                bg="gray.700"
                w="100%"
                minH={["40px", "50px"]}
                borderRadius="16px"
                _hover={{
                    bg: "gray.800",
                }}
                mb="10px">
                <Flex flexDirection="row" align="center" h="100%" w="100%">
                    <Text textAlign="left" px="20px" fontSize="25px" w="100%">
                        #{tag}
                    </Text>
                </Flex>
            </Grid>
        </Link>
    );
}

export default LinkSearchForTag;
