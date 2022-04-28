import { Grid, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ReactScrollToBottom from "./ReactScrollToBottom";
import { IoSend } from "react-icons/io5";
// https://ionicons.com/

function ChatMessages({ chatSocket, me }) {
  const { t } = useTranslation();
  const languageValues = {
    message: t("message"),
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    chatSocket?.emit("history", (data) => {
      setMessages(data?.messages);
    });

    const onMessage = (m) => {
      setMessages((messages) => [...messages, m]);
    };

    chatSocket?.on("message", onMessage);

    return () => chatSocket?.off("message", onMessage);
  }, [chatSocket]);

  const handleSubmit = () => {
    if (message.length > 0) {
      chatSocket?.emit("message", { message: message });
      setMessage("");
    }
  };

  return (
    <Grid h="100%" templateRows="minmax(50px, 1fr) 50px" overflowY="auto">
      <ReactScrollToBottom messages={messages} me={me} overflowY="scroll" />
      <Grid
        templateColumns="1fr 50px"
        placeItems="center"
        borderTop="1px"
        borderColor="gray.500"
        p="5px"
      >
        <Input
          p="10px"
          placeholder={languageValues.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <IoSend size="30px" cursor="pointer" onClick={handleSubmit} />
      </Grid>
    </Grid>
  );
}

export default ChatMessages;
