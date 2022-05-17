import { Flex, Avatar, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config/baseUrl";

function ChatInfo({ chatSocket, me }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    chatSocket?.emit("info", (response) =>
      setUser(response?.users?.filter((u) => u.id !== me.id)[0])
    );
  }, [me, chatSocket]);

  return (
    <Flex
      flexDirection={{ base: "row", md: "column" }}
      justifyContent="center"
      alignItems="center"
      borderRight={{ base: "0", md: "1px" }}
      borderBottom={{ base: "1px", md: "0" }}
      borderColor={{ base: "gray.500", md: "gray.500" }}
    >
      {user && (
        <>
          <Avatar
            boxSize={{ base: "3rem", md: "12rem" }}
            src={baseUrl + user.avatar}
          />
          <Heading
            fontSize="2xl"
            textAlign="center"
            m={{ base: "0.5rem", sm: "0.5rem 2rem", md: "0.5rem" }}
          >
            {user.nameFirst} {user.nameLast}
          </Heading>
          <Text
            fontWeight="600"
            color="gray.500"
            size="sm"
            display={{ base: "none", md: "inline" }}
          >
            {user.login && `@${user.login}`}
          </Text>
        </>
      )}
    </Flex>
  );
}

export default ChatInfo;
