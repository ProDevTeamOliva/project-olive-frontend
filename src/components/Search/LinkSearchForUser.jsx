import { Text, Flex, Avatar, GridItem, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

function LinkSearchForUser({ id, nameFirst, nameLast, avatar, onClose }) {
  const friends = useSelector((state) =>
    state.meFriends.friends.filter((friend) => friend.id === id)
  );
  return (
    <Grid
      templateColumns="20% 60% 20%"
      bgGradient="linear(to-r,gray.300, gray.500, gray.700)"
      w="100%"
      minH="50px"
      shadow="md"
      borderRadius="20px"
      _hover={{
        bgGradient: "linear(to-r,gray.400, gray.600, gray.700)",
      }}
      mb="10px"
    >
      <GridItem colStart="1" colEnd="2" ml="15px">
        <Flex flexDirection="row" align="center" justify="center" h="100%">
          <Link
            to={`/user/${id}`}
            params={{ id: id }}
            onClick={() => onClose()}
          >
            <Avatar
              boxSize="40px"
              src={avatar}
              alt={avatar}
              bg="mediumslateblue"
            />
          </Link>
        </Flex>
      </GridItem>
      <GridItem colStart="2" colEnd="3">
        <Flex flexDirection="row" align="center" h="100%" ml="20px">
          <Link
            to={`/user/${id}`}
            params={{ id: id }}
            onClick={() => onClose()}
          >
            <Text textAlign="left" w="100%" fontWeight="semibold">
              {nameFirst} {nameLast}
            </Text>
          </Link>
        </Flex>
      </GridItem>

      <GridItem colStart="3" colEnd="4">
        {Array.from(friends).length > 0 ? (
          <Flex flexDirection="row" align="center" h="100%">
            <Link to={`/chat/${friends[0].idConversation}`}>
              <Text mr="25px" fontWeight="bold">
                <IoSend color="white" size="28px" cursor="pointer" />
              </Text>
            </Link>
          </Flex>
        ) : (
          <></>
        )}
      </GridItem>
    </Grid>
  );
}

export default LinkSearchForUser;
