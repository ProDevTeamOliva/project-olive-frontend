import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsFillBellFill } from "react-icons/bs";
import Notifications from "./Notifications";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { memo, useState } from "react";

function Bell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [animation, setAnimation] = useState(false);

  const pendingReceived = useSelector(
    (state) => state.meFriends.pendingReceived
  );

  return (
    <Box
      pos="relative"
      d="inline-block"
      gridColumn="4/5"
      gridRow="1/2"
      role="group"
    >
      <Box mr={["-15px", "-5px", "40px"]}>
        {pendingReceived.length > 0 && (
          <Box
            h="22px"
            w="22px"
            position="absolute"
            bg="blue.400"
            borderRadius="20px"
            right={["-21px", "-4px", "33px"]}
            bottom="6"
          >
            <Text
              textAlign="center"
              mt="-1px"
              fontSize="14px"
              color="gray.900"
              fontWeight="bold"
            >
              {pendingReceived.length > 9 ? "+9" : pendingReceived.length}
            </Text>
          </Box>
        )}
        <Button
          {...unStyledButton}
          onClick={() => onOpen()}
          variant="unstyled"
          mb="1"
        >
          <BsFillBellFill
            style={{
              width: "45px",
              height: "45px",
              transform: animation ? `rotate(20deg)` : `rotate(0deg)`,
              transition: `transform 150ms`,
            }}
            onMouseOver={() => setAnimation(true)}
            onMouseLeave={() => setAnimation(false)}
          ></BsFillBellFill>
        </Button>
        <Notifications isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
}

export default memo(Bell);
