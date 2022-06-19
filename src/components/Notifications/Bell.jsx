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
        state => state.meFriends.pendingReceived
    );

    return (
        <Box pos="relative" d="inline-block" role="group">
            <Box>
                {pendingReceived.length > 0 && (
                    <Box
                        boxSize="22px"
                        position="absolute"
                        bg="mediumslateblue"
                        borderRadius="20px"
                        top="-6px"
                        right="-8px"
                        bottom="6">
                        <Text
                            textAlign="center"
                            mt="-1px"
                            fontSize="14px"
                            color="gray.200"
                            fontWeight="bold">
                            {pendingReceived.length > 9
                                ? "+9"
                                : pendingReceived.length}
                        </Text>
                    </Box>
                )}
                <Button
                    {...unStyledButton}
                    onClick={() => onOpen()}
                    variant="unstyled"
                    mb="1">
                    <BsFillBellFill
                        style={{
                            width: "45px",
                            height: "45px",
                            transform: animation
                                ? `rotate(20deg)`
                                : `rotate(0deg)`,
                            transition: `transform 150ms`,
                        }}
                        onMouseOver={() => setAnimation(true)}
                        onMouseLeave={() => setAnimation(false)}
                    />
                </Button>
                <Notifications isOpen={isOpen} onClose={onClose} />
            </Box>
        </Box>
    );
}

export default memo(Bell);
