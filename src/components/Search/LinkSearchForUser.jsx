import { Text, Flex, Avatar, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

function LinkSearchForUser({ id, nameFirst, nameLast, avatar, onClose }) {
    const friend = useSelector(state =>
        state.meFriends.friends.find(friend => friend.id === id)
    );

    return (
        <Grid
            templateColumns={
                !isNaN(friend?.idConversation)
                    ? "70px minmax(80px, 1fr) 50px"
                    : "70px minmax(120px, 1fr) 10px"
            }
            bg="gray.600"
            minW="200px"
            minH="50px"
            borderRadius="16px"
            _hover={{
                bg: "gray.700",
            }}
            mb="10px">
            <Link
                to={`/user/${id}`}
                params={{ id: id }}
                onClick={() => onClose()}
                mx="10px">
                <Flex
                    flexDirection="row"
                    align="center"
                    justify="center"
                    h="100%">
                    <Avatar boxSize="40px" src={avatar} alt={avatar} />
                </Flex>
            </Link>

            <Link
                to={`/user/${id}`}
                params={{ id: id }}
                onClick={() => onClose()}>
                <Flex flexDirection="row" align="center" h="100%">
                    <Text textAlign="left" w="100%" fontWeight="semibold">
                        {nameFirst} {nameLast}
                    </Text>
                </Flex>
            </Link>

            {!isNaN(friend?.idConversation) && (
                <Flex flexDirection="row" align="center" h="100%">
                    <Link to={`/chat/${friend.idConversation}`}>
                        <Text mx="10px" fontWeight="bold">
                            <IoSend
                                color="white"
                                size="30px"
                                cursor="pointer"
                            />
                        </Text>
                    </Link>
                </Flex>
            )}
        </Grid>
    );
}

export default LinkSearchForUser;
