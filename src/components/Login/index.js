import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, storage } from "../../services/firebase";
import * as C from "./styles";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState(''); // Nome do usuário será capturado aqui
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFormLogin, setShowFormLogin] = useState(false); // Estado para controlar a visibilidade
  const [showFormFile, setShowFormFile] = useState(false);   // Estado para controlar a visibilidade
  const [file, setFile] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    const finalPassword = password.length < 6 ? password + '123456' : password;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, finalPassword);
      const user = userCredential.user;

      setSuccess('Usuário criado com sucesso!');
      setError('');

      await db.collection('users').doc(user.uid).set({
        email: user.email,
        nome: nome, 
      });


      // Criar chat com o usuário "hacker" automaticamente
      const hackerEmail = "hacker@css.com"; 
      const chatDocRef = await db.collection("chats").add({
        users: [user.email, hackerEmail],
      });

      // if (file) {
      //   const fileRef = storage.ref(`chats/${chatDocRef.id}/${file.name}`);
      //   await fileRef.put(file); // Faz o upload do arquivo
      //   const fileURL = await fileRef.getDownloadURL(); // Obtém a URL do arquivo

      //   // Enviar a mensagem no chat com a URL do arquivo
      //   await db.collection("chats").doc(chatDocRef.id).collection("messages").add({
      //     message: `Arquivo enviado: ${file.name}`,
      //     fileURL: fileURL, // Armazenar a URL do arquivo
      //     user: user.email,
      //     timestamp: new Date(),
      //   });
      // }

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, finalPassword);
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
        Se chegou até aqui, você já deve saber o que está acontecendo. Mas caso não saiba, temos  um breve resumo para que você se situe sobre o que é um <C.a href="https://www.kaspersky.com.br/resource-center/threats/ransomware">RANSOMWARE</C.a>.
        <br />
        Só nós sabemos como descriptografar seus arquivos e voltar o funcionamento correto da sua empresa. Entre em contato com nosso suporte para informações sobre negociações, pagamento, garantia de devolução dos dados e maiores detalhes.
        Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados. <br></br>
        <br></br>Extensões permitidas: .noaccess <C.span>/</C.span> .no-access <C.span>/</C.span> .narsw <C.span>/</C.span> .nalok <C.span>/</C.span> .jigsaw
        <br></br>Tamanho máximo da amostra: <C.span>256kbps</C.span>
        <br></br>
        <br></br>
        <C.Button onClick={toggleFormFileVisibility} id="openModal">Enviar amostra</C.Button>
        <C.Button onClick={toggleFormVisibility}>Chat com o suporte</C.Button>

        {/* Formulário de envio de amostra */}
        {showFormFile && (

            <C.divModal >
                <C.Form onSubmit={handleSignup}>
                <h2 style={{display: 'inline'}}>Trial Decrypt </h2>
                <C.spanClose onClick={toggleFormFileVisibility}>×</C.spanClose>     
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
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>
                  <C.Button onClick={handleSignup}>Enviar</C.Button>
                </C.Form>
            </C.divModal>
        )}

        {/* Formulário de login */}
        {showFormLogin && (
          <C.divModal >

            <C.Form onSubmit={handleSignup}>
              <h2 style={{display: 'inline'}}>Chat </h2>
              <C.spanClose onClick={toggleFormVisibility}>×</C.spanClose> 
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
                <label>Empresa:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <C.Button onClick={handleSignup}>Entrar</C.Button>
            {error && <p style={{ color: 'red', marginTop: '3vh' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '3vh' }}>{success}</p>}
            </C.Form>
          </C.divModal>
        )}
      </C.div>

      {/* Exibe mensagens de erro ou sucesso */}

      <C.footer>
        <p>
          Este é um Site <C.a href="https://www.css-br.com">Castle</C.a>, utilizado para fins de simulação, 
          em caso de dúvidas entre em contato conosco:  
          <C.a href="mailto:contato@css-br.com.br?subject=Portal do Hacker&body=Conteúdo do email que será preenchido automaticamente"> contato@css-br.com.br</C.a>

          </p>
      </C.footer>
    </C.Container>
  );
};

export default Login;