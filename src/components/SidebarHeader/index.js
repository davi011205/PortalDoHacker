import React from "react";
import * as C from "./styles";
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiExit } from "react-icons/bi";
import fotoJigsaw from "../../styles/fundo-inicial.jpg"
import { MdPerson } from "react-icons/md";

const SidebarHeader = ({ setUserChat }) => {
  const [user] = useAuthState(auth);
  const refChat = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(refChat);

  const handleCreateChat = () => {
    const emailInput = prompt("Escreva o e-mail desejado");

    if (!emailInput) return;

    if (emailInput === user.email) {
      return alert("Insira um e-mail diferente do seu!");
    } else if (chatExists(emailInput)) {
      return alert("Chat já existe!");
    }

    db.collection("chats").add({
      users: [user.email, emailInput],
    });
  };

  const chatExists = (emailChat) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === emailChat)?.length > 0
    );
  };

  return (
    <C.Container>
      {user?.email === 'hacker@css.com' ? (
        <C.Avatar src={fotoJigsaw} />
        ) : (
          <MdPerson />
        )
      }
      <C.Options>
            <BiExit onClick={() => [auth.signOut(), setUserChat(null)]}></BiExit>
      </C.Options>
    </C.Container>
  );
};

export default SidebarHeader;
