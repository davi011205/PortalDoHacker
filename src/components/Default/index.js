import React from "react";
import * as C from "./styles";
import { MdMessage } from "react-icons/md";
import { BiFontSize, BiUserPlus } from "react-icons/bi";

const Default = () => {
  return (
    <C.Container>
      <MdMessage />
      <C.Title>Grupo Jigsaw</C.Title>
      <C.subTitle>Suporte Hacker</C.subTitle>
      <C.Info>
        Aqui Você vai poder negociar, pagar e ter maiores detalhes.
        Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados. 
        Clique no hacker para iniciar a negociação.       
      </C.Info>
    </C.Container>
  );
};

export default Default;
