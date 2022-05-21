import { Grid, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useCallback, useEffect } from "react";
import ReactScrollToBottom from "./ReactScrollToBottom";
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import { IoSend } from "react-icons/io5";
// https://ionicons.com/

function ChatMessages({ chatSocket, me }) {
  const { t } = useTranslation();
  const languageValues = {
    message: t("message"),
    deletingMessage: t("deletingMessage"),
    alertDeleteMessage: t("alertDeleteMessage"),
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState(false);

  const [messageId, setMessageId] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const onMessage = useCallback((response) => {
    setMessages((messages) => [...messages, response]);
  }, []);

  const onMore = useCallback((response) => {
    if (response?.messages.length === 0) {
      setAllMessages(true);
    }
    setMessages((messages) => [...response?.messages?.reverse(), ...messages]);
  }, []);

  const onDelete = useCallback((response) => {
    setMessages((messages) =>
      messages.filter((m) => m.messageId !== response.id)
    );
  }, []);

  const loadMore = () => {
    chatSocket?.emit(
      "history",
      { id: Math.min(...messages.map((message) => message.messageId)) },
      onMore
    );
  };

  const messegeDelete = (id) => {
    chatSocket?.emit("messegeDelete", { id: id }, onDelete);
  };

  const handleSubmit = () => {
    if (message.length > 0) {
      chatSocket?.emit("message", { message: message }, onMessage);
      setMessage("");
    }
  };

  useEffect(() => {
    chatSocket?.emit("history", (response) => {
      setMessages(response?.messages?.reverse());
    });

    chatSocket?.on("message", onMessage);
    chatSocket?.on("messegeDelete", onDelete);

    return () => {
      chatSocket?.off("message", onMessage);
      chatSocket?.off("messegeDelete", onDelete);
    };
  }, [chatSocket, onMessage, onDelete]);

  return (
    <Grid h="100%" templateRows="minmax(50px, 1fr) 50px" overflowY="auto">
      <ReactScrollToBottom
        messages={messages}
        me={me}
        loadMore={loadMore}
        allMessages={allMessages}
        setMessageId={setMessageId}
        setIsOpen={setIsOpen}
        overflowY="scroll"
      />

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

      <AlertToConfirmation
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={() => onCloseAlert() || messegeDelete(messageId)}
        cancelRef={cancelRef}
        header={languageValues.deletingMessage}
        body={languageValues.alertDeleteMessage}
      />
    </Grid>
  );
}

export default ChatMessages;
