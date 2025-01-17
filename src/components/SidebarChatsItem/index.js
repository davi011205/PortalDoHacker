import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { MdPerson } from "react-icons/md";
import fotoJigsaw from '../../styles/fundoFormulario.jpg';

const getUser = (users, userLogged) =>
  users?.filter((user) => user !== userLogged?.email)[0];

const SidebarChatsItem = ({ id, users, user, setUserChat, active }) => {
  const [getUserItem] = useCollection(
    db.collection("users").where("email", "==", getUser(users, user))
  );

  const Avatar = getUserItem?.docs?.[0]?.data();
  const item = getUser(users, user);
  const nome = Avatar?.nome;

  const handleNewChat = () => {
    const userChat = {
      chatId: id,
      name: nome,
      photoURL: Avatar?.photoURL,
    };

    setUserChat(userChat);
  };

  const isHacker = Avatar?.email === 'hacker@css.com'; 

  return (
    <C.Container onClick={handleNewChat} className={active}>
      {isHacker ? (
        <C.Avatar src={fotoJigsaw} alt="Jigsaw" />
      ) :  (
        <MdPerson />
      )}
      <C.Name>{nome}</C.Name>
    </C.Container>
  );
};

export default SidebarChatsItem;