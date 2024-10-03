import React, { useEffect, useRef } from "react";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";

const ChatBody = ({ chatId }) => {
  const [messagesRes] = useCollection(
    db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const refBody = useRef("");

  useEffect(() => {
    if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
      refBody.current.scrollTop =
        refBody.current.scrollHeight - refBody.current.offsetHeight;
    }
  }, [messagesRes]);

  return (
    <C.Container ref={refBody}>
      {messagesRes?.docs.map((message) => {
        const messageData = message.data();

        return (
          <Message
            key={message.id}
            user={messageData.user}
            message={{
              // Renderizando a mensagem com HTML, caso haja link
              message: (
                <C.divMensagem
                  dangerouslySetInnerHTML={{
                    __html: messageData.message,
                  }}
                ></C.divMensagem>
              ),
              timestamp: messageData.timestamp?.toDate().getTime(),
            }}
          />
        );
      })}
    </C.Container>
  );
};

export default ChatBody;
