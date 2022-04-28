import { Grid, Box } from "@chakra-ui/react";
import ScrollToBottom, {
  FunctionContext,
  StateContext,
} from "react-scroll-to-bottom";
import { IconContext } from "react-icons";
import { IoEllipse, IoArrowDownCircle } from "react-icons/io5";
// https://ionicons.com/

const Content = ({ scrollToBottom, sticky, messages, me }) => {
  return (
    <Grid>
      {messages?.map((m) =>
        m?.user?.id === me?.id ? (
          <Box
            key={m.messageId}
            m={{ base: "5px 10px 5px 25px", sm: "5px 10px 5px 50px" }}
            p="5px 10px"
            bgColor="mediumslateblue"
            color="white"
            borderRadius="15px"
            maxW="600px"
            w="fit-content"
            justifySelf="end"
          >
            {m.message}
          </Box>
        ) : (
          <Box
            key={m.messageId}
            m={{ base: "5px 25px 5px 10px", sm: "5px 50px 5px 10px" }}
            p="5px 10px"
            bgColor="white"
            color="black"
            borderRadius="15px"
            maxW="600px"
            w="fit-content"
            justifySelf="start"
          >
            {m.message}
          </Box>
        )
      )}
      {!sticky && (
        <>
          <IconContext.Provider
            value={{
              size: "34px",
              color: "black",
              style: {
                position: "absolute",
                bottom: "3px",
                left: "0",
                right: "0",
                margin: "0 auto",
                cursor: "pointer",
              },
            }}
          >
            <IoEllipse />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: "30px",
              color: "white",
              style: {
                position: "absolute",
                bottom: "5px",
                left: "0",
                right: "0",
                margin: "0 auto",
                cursor: "pointer",
              },
            }}
          >
            <IoArrowDownCircle
              onClick={() => scrollToBottom({ behavior: "smooth" })}
            />
          </IconContext.Provider>
        </>
      )}
    </Grid>
  );
};

const ReactScrollToBottom = ({ messages, me }) => (
  <ScrollToBottom>
    <FunctionContext.Consumer>
      {({ scrollToBottom }) => (
        <StateContext.Consumer>
          {({ sticky }) => (
            <Content
              scrollToBottom={scrollToBottom}
              sticky={sticky}
              messages={messages}
              me={me}
            />
          )}
        </StateContext.Consumer>
      )}
    </FunctionContext.Consumer>
  </ScrollToBottom>
);

export default ReactScrollToBottom;
