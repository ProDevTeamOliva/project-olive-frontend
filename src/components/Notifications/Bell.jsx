import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { connect } from "react-redux";
import { BsFillBellFill } from "react-icons/bs";
import Notifications from "./Notifications";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
const Bell = ({ pendingSent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      pos="relative"
      d="inline-block"
      gridColumn="3/4"
      gridRow="1/2"
      role="group"
    >
      <Box mr={["-15px", "-5px", "40px"]}>
        {pendingSent.length > 0 && (
          <Box
            h="22px"
            w="22px"
            position="absolute"
            bg="blue.400"
            borderRadius="20px"
            right={["-13px", "-7px", "37px"]}
          >
            <Text textAlign="center" mt="-1px" fontSize="14px">
              {pendingSent.length > 9 ? "+9" : pendingSent.length}
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
            style={{ width: "45px", height: "45px" }}
          ></BsFillBellFill>
        </Button>

        <Notifications isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  pendingSent: state.meFriends.pendingSent,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bell);