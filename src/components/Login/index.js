import React from "react";
import { auth, provider } from "../../services/firebase";
import * as C from "./styles";
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFormLogin, setShowFormLogin] = useState(false); // Estado para controlar a visibilidade
  const [showFormFile, setShowFormFile] = useState(false); // Estado para controlar a visibilidade

  const handleSignup = (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sucesso ao cadastrar
        const user = userCredential.user;
        setSuccess('Usuário criado com sucesso!');
        setError(''); // Limpa o erro se houver
      })
      .catch((error) => {
        if(error.code === 'auth/email-already-in-use') {
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setSuccess('Login realizado com sucesso!');
            setError('');
          })
          .catch((error) => {
            setError(`Erro ao tentar logar: ${error.message}`);
            setSuccess('');
          })
        }
        else {
          setError(`Erro [${errorCode}]: ${errorMessage}`);
          setSuccess(''); // Limpa a mensagem de sucesso
        }
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
   // Função para alternar a visibilidade do formulário
   const toggleFormVisibility = () => {
    setShowFormLogin(!showFormLogin); // Alterna entre true e false
  };
   const toggleFormFileVisibility = () => {
    setShowFormFile(!showFormFile); // Alterna entre true e false
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

        <br></br>
        <C.Button onClick={toggleFormFileVisibility}>Enviar amostra</C.Button>
        <C.Button onClick={toggleFormVisibility}>Chat com o suporte</C.Button>

          {showFormFile && (
            <C.Form onSubmit={handleSignup}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Empresa:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Arquivo:</label>
                <input
                  type="file"
                  required
                />
              </div>
              <C.Button onClick={handleSignup}>Criar conta e enviar</C.Button>
          </C.Form>
          )}

        {showFormLogin && (
          <C.Form onSubmit={handleSignup}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Empresa:</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <C.Button onClick={handleSignup}>Entrar</C.Button>
          </C.Form>
        )}

    


    </C.div>

{error && <p style={{ color: 'red' }}>{error}</p>}
{success && <p style={{ color: 'green' }}>{success}</p>}  

    </C.Container>
    </>




  );
};

export default Login;