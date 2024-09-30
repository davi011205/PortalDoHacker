import React from "react";
import * as C from "./styles";
import { MdMessage } from "react-icons/md";
import { BiFontSize, BiUserPlus } from "react-icons/bi";

const Default = () => {
  return (
    <C.Container>
      <MdMessage />
      <C.Title>Suporte Hacker</C.Title>
      <C.Info>
        Aqui Você vai poder negociar, pagar e ter maiores detalhes.
        Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados.        
      </C.Info>
    </C.Container>
  );
};

export default Default;
