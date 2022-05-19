import { Grid, Tooltip, Box } from "@chakra-ui/react";
import { parseDate } from "../../operations/parseDate";
import ScrollToBottom, {
  useObserveScrollPosition,
  FunctionContext,
  StateContext,
} from "react-scroll-to-bottom";
import { IconContext } from "react-icons";
import { IoEllipse, IoArrowDownCircle } from "react-icons/io5";
// https://ionicons.com/

const Content = ({
  scrollToBottom,
  sticky,
  messages,
  me,
  loadMore,
  allMessages,
}) => {
  useObserveScrollPosition(
    ({ scrollTop }) => {
      if (!allMessages && scrollTop !== 0 && scrollTop < 100) {
        loadMore();
      }
    },
    [loadMore]
  );

  return (
    <Grid>
      {messages?.map((m) =>
        m?.user?.id === me?.id ? (
          <Grid key={m.messageId}>
            <Tooltip label={`${parseDate(m.date)}`} bg="white" placement="left">
              <Box
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
            </Tooltip>
          </Grid>
        ) : (
          <Grid key={m.messageId}>
            <Tooltip label={`${parseDate(m.date)}`} bg="white" placement="left">
              <Box
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
            </Tooltip>
          </Grid>
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

const ReactScrollToBottom = ({ messages, me, loadMore, allMessages }) => (
  <ScrollToBottom initialScrollBehavior="auto">
    <FunctionContext.Consumer>
      {({ scrollToBottom }) => (
        <StateContext.Consumer>
          {({ sticky }) => (
            <Content
              scrollToBottom={scrollToBottom}
              sticky={sticky}
              messages={messages}
              me={me}
              loadMore={loadMore}
              allMessages={allMessages}
            />
          )}
        </StateContext.Consumer>
      )}
    </FunctionContext.Consumer>
  </ScrollToBottom>
);

export default ReactScrollToBottom;
