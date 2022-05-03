import { Grid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getMe } from "../../actions/meActions";
import io from "socket.io-client";
import { baseUrl } from "../../config/baseUrl";
import ChatInfo from "./ChatInfo";
import ChatMessages from "./ChatMessages";

function Chat({ id, me, getMe }) {
  const { t } = useTranslation();
  const languageValues = {
    reconnecting: t("reconnecting"),
  };

  const [chatSocket, setChatSocket] = useState(undefined);

  useEffect(() => {
    getMe();

    const socket = io(`${baseUrl}/chat/${id}`, {
      forceNew: true,
      withCredentials: true,
    });

    socket.on("connect", () => setChatSocket(socket));
    socket.on("reconnect", () => setChatSocket(socket));
    socket.on("connect_error", () => setChatSocket(undefined));

    return () => socket.close();
  }, [getMe, id]);

  return (
    <>
      {chatSocket ? (
        <Grid
          h="100vh"
          justifyContent="center"
          templateColumns={{ base: "1fr", md: "300px 1fr" }}
          templateRows={{ base: "75px 1fr", md: "1fr" }}
        >
          <ChatInfo chatSocket={chatSocket} me={me} />
          <ChatMessages chatSocket={chatSocket} me={me} />
        </Grid>
      ) : (
        <Grid h="100vh" placeItems="center">
          <Text fontSize="2xl" fontWeight="600">
            {languageValues.reconnecting}
          </Text>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  me: state.me.me,
});

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);