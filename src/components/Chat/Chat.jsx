import { Grid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import io from "socket.io-client";
import { baseUrl } from "../../config/baseUrl";
import ChatNavbar from "./ChatNavbar";
import ChatFriends from "./ChatFriends";
import ChatMessages from "./ChatMessages";
import { getMe } from "../../actions/meActions";

function Chat({ id }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    reconnecting: t("reconnecting"),
  };

  const me = useSelector((state) => state.me.me);

  const [chatSocket, setChatSocket] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    dispatch(getMe());

    const socket = io(`${import.meta.env.DEV ? baseUrl : ""}/chat/${id}`, {
      forceNew: true,
      withCredentials: import.meta.env.DEV,
      path: `${import.meta.env.DEV ? "" : baseUrl}/socket.io/`
    });

    socket.on("connect", () => setChatSocket(socket));
    socket.on("reconnect", () => setChatSocket(socket));
    socket.on("connect_error", () => setChatSocket(undefined));

    return () => socket.close();
  }, [dispatch, id]);

  useEffect(() => {
    chatSocket?.emit("info", { id: id }, (response) =>
      setUser(response?.users?.filter((u) => u.id !== me.id)[0])
    );
  }, [chatSocket, id, me]);

  return (
    <>
      {chatSocket ? (
        <Grid
          h="100vh"
          justifyContent="center"
          templateColumns={{ base: "75px 1fr", md: "300px 1fr" }}
          templateRows="75px 1fr"
        >
          <ChatNavbar user={user} />
          <ChatFriends user={user} />
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

export default memo(Chat);
