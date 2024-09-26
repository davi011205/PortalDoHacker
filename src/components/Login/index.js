import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../services/firebase"; // Certifique-se que o serviço firebase está configurado corretamente
import * as C from "./styles";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState(''); // Nome do usuário será capturado aqui
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFormLogin, setShowFormLogin] = useState(false); // Estado para controlar a visibilidade
  const [showFormFile, setShowFormFile] = useState(false);   // Estado para controlar a visibilidade

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSuccess('Usuário criado com sucesso!');
      setError('');

      // Adicionar o nome do usuário no banco de dados "users" para uso posterior
      await db.collection('users').add({
        email: user.email,
        nome: nome, // Salva o nome inserido no formulário
      });

      // Criar chat com o usuário "hacker" automaticamente
      const hackerEmail = "hacker@example.com"; // Coloque o email real do "hacker"
      await db.collection("chats").add({
        users: [user.email, hackerEmail],
      });

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Tentar login se o email já estiver em uso
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          setSuccess('Login realizado com sucesso!');
          setError('');
        } catch (loginError) {
          setError(`Erro ao tentar logar: ${loginError.message}`);
          setSuccess('');
        }
      } else {
        setError(`Erro: ${error.message}`);
        setSuccess('');
      }
    }
  };

  // Alternar visibilidade do formulário de login e envio de arquivos
  const toggleFormVisibility = () => setShowFormLogin(!showFormLogin);
  const toggleFormFileVisibility = () => setShowFormFile(!showFormFile);

  return (
    <C.Container>
      <C.h2>Seja bem-vindo, este é o canal de suporte do grupo JIGSAW!</C.h2>
      <C.div>
        Seus sistemas e arquivos foram comprometidos? Sua empresa está inoperante? Aqui conseguiremos te ajudar!
        <br />
        Se chegou até aqui, você já deve saber o que está acontecendo. Mas caso não saiba, temos  um breve resumo para que você se situe sobre o que é um <a href="https://www.kaspersky.com.br/resource-center/threats/ransomware">RANSOMWARE</a>.
        <br />
        Só nós sabemos como descriptografar seus arquivos e voltar o funcionamento correto da sua empresa. Entre em contato com nosso suporte para informações sobre negociações, pagamento, garantia de devolução dos dados e maiores detalhes.
        Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados. <br></br>
        <br></br>Extensões permitidas: .noaccess <span>/</span> .no-access <span>/</span> .narsw <span>/</span> .nalok <span>/</span> .jigsaw
        <br></br>Tamanho máximo da amostra: <span>256kbps</span>
        <br></br>
        <C.Button onClick={toggleFormFileVisibility}>Enviar amostra</C.Button>
        <C.Button onClick={toggleFormVisibility}>Chat com o suporte</C.Button>

        {/* Formulário de envio de amostra */}
        {showFormFile && (
          <C.Form onSubmit={handleSignup}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
              <label>Senha:</label>
              <input
                type="password"
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

        {/* Formulário de login */}
        {showFormLogin && (
          <C.Form onSubmit={handleSignup}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <C.Button onClick={handleSignup}>Entrar</C.Button>
          </C.Form>
        )}
      </C.div>

      {/* Exibe mensagens de erro ou sucesso */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </C.Container>
  );
};

export default Login;