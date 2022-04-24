import { Heading, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function InfoAboutMeV1() {
  const me = useSelector((state) => state.me.me);

  return (
    <Stack
      flex="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt={{ base: "4", md: "0" }}
    >
      <Heading fontSize="2xl" textAlign="center">
        {me.nameFirst} {me.nameLast}
      </Heading>
      <Text fontWeight="600" color="gray.500" size="sm">
        {me.login && `@${me.login}`}
      </Text>
    </Stack>
  );
}

export default InfoAboutMeV1;
