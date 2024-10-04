import React, {useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase";
import * as C from "./styles";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarChatsItem from "../SidebarChatsItem";

const SidebarChats = ({ setUserChat, userChat }) => {
  const [user] = useAuthState(auth);
  const hackerEmail = 'hacker@css.com'

  const refChat = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapshot] = useCollection(refChat);

  useEffect(() => {
    if (user.email !== hackerEmail && chatsSnapshot) {
      const hackerChat = chatsSnapshot.docs.find((doc) => 
        doc.data().users.includes(hackerEmail)
      );

      if (hackerChat && (!userChat || userChat.chatId !== hackerChat.id)) {
        setUserChat({
          chatId: hackerChat.id,
          users: hackerChat.data().users,
        });
      }
    }
  }, [chatsSnapshot, user, userChat, setUserChat]);

  return (
    <C.Container>
      {chatsSnapshot?.docs.map((item, index) => (
        <C.Content key={index}>
          <SidebarChatsItem
            id={item.id}
            users={item.data().users}
            user={user}
            setUserChat={setUserChat}
            active={
              userChat?.chatId === item.id ||
              (user.email !== hackerEmail && item.data().users.includes(hackerEmail) && !userChat)
                ? "active"
                : ""
            }
          />
          <C.Divider />
        </C.Content>
      ))}
    </C.Container>
  );
};

export default SidebarChats;
