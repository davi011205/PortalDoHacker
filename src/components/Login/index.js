import React from "react";
import { auth, provider } from "../../services/firebase";
import * as C from "./styles";

const Login = () => {
  const handleSignin = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <>
    <C.Container>
      <C.h2>Seja bem-vindo, este é o canal de suporte do grupo JIGSAW!</C.h2>

      <C.div>
            Seus sistemas e arquivos foram comprometidos? Sua empresa está inoperante? Aqui conseguiremos te ajudar! 
            <br></br>
            Se chegou até aqui, você já deve saber o que está acontecendo. Mas caso não saiba, temos  um breve resumo para que você se situe sobre o que é um <a href="https://www.kaspersky.com.br/resource-center/threats/ransomware">RANSOMWARE</a>. 
            <br></br>
            Só nós sabemos como descriptografar seus arquivos e voltar o funcionamento correto da sua empresa. Entre em contato com nosso suporte para informações sobre negociações, pagamento, garantia de devolução dos dados e maiores detalhes.
            Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados. <br></br>
            <br></br>Extensões permitidas: .noaccess <span>/</span> .no-access <span>/</span> .narsw <span>/</span> .nalok <span>/</span> .jigsaw
            <br></br>Tamanho máximo da amostra: <span>256kbps</span>

        <C.Button><a href="chat.html">Chat com o suporte</a></C.Button>
        <C.Button id="openModal">Enviar amostra</C.Button>
          <img src="src/styles/fundo-inicial.jpg"></img>
    </C.div>




      <C.Button onClick={handleSignin}>Login com Google</C.Button>
    </C.Container>
    </>
  );
};

export default Login;
