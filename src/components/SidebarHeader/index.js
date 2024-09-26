import React from "react";
import * as C from "./styles";
import { MdDonutLarge, MdChat, MdMoreVert, MdMore, MdPlusOne } from "react-icons/md";
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiUserPlus } from "react-icons/bi";

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
      <C.Avatar
        src={user?.photoURL}
        onClick={() => [auth.signOut(), setUserChat(null)]}
      />
      <C.Options>
        {/* Só exibir o ícone BiUserPlus se o email e a empresa não forem "daviemail@gmail.com" e "daviempresa" */}
        {(user.email === "daviemail@gmail.com" && user.empresa === "daviempresa") && (
          <BiUserPlus onClick={handleCreateChat} />
        )}
      </C.Options>
    </C.Container>
  );
};

export default SidebarHeader;
