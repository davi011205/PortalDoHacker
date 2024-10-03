import React from "react";
import * as C from "./styles";
import { MdPerson, MdMoreVert, MdSearch } from "react-icons/md";
import fotoJigsaw from "../../styles/fundo-inicial.jpg"

const ChatHeader = ({ photoURL, name }) => {
  return (
    <C.Container>
      <C.UserInfo>
        <C.Avatar src={fotoJigsaw}/>
        <C.NameContent>
          <C.Name>{name}</C.Name>
        </C.NameContent>
      </C.UserInfo>
    </C.Container>
  );
};

export default ChatHeader;
