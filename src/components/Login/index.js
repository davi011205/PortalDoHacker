import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, storage } from "../../services/firebase";
import * as C from "./styles";
import fotoJigsaw from '../../styles/fundo-inicial.jpg';
import firebase from "firebase/compat/app";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showFormFile, setShowFormFile] = useState(false);  
  const [file, setFile] = useState(null);
  const hackerEmail = "hacker@css.com"; 

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
  
      
      // Verifica se o chat com o hacker já existe
      const chatsRef = db.collection("chats");
      const querySnapshot = await chatsRef
        .where("users", "array-contains", user.email)
        .get();
  
      let chatDocRef = null;
  
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.users.includes(hackerEmail)) {
          chatDocRef = doc.ref;
        }
      });
  
      // Se o chat não existir, cria um novo
      if (!chatDocRef) {
        chatDocRef = await chatsRef.add({
          users: [user.email, hackerEmail],
        });
      }
  
      // Upload do arquivo para o Firebase Storage
      if (file) {
        const storageRef = storage.ref(`chats/${user.uid}/${file.name}`);
        const uploadTask = storageRef.put(file);
  
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Erro ao enviar o arquivo: ", error);
            setError("Erro ao enviar o arquivo");
          },
          async () => {
            const fileURL = await uploadTask.snapshot.ref.getDownloadURL();
  
            // Envia a mensagem com o link do arquivo no chat existente com o hacker
            await chatDocRef.collection("messages").add({
              message: `Arquivo enviado: <a href="${fileURL}" target="_blank">${file.name}</a>`,
              user: user.email,
              photoURL: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
  
            setSuccess("Arquivo enviado com sucesso!");
          }
        );
      }
  
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, finalPassword);
          const user = userCredential.user;
  
          // Verifica se o chat com o hacker já existe
          const chatsRef = db.collection("chats");
          const querySnapshot = await chatsRef
            .where("users", "array-contains", user.email)
            .get();
  
          let chatDocRef = null;
  
          querySnapshot.forEach((doc) => {
            const chatData = doc.data();
            if (chatData.users.includes(hackerEmail)) {
              chatDocRef = doc.ref;
            }
          });
  
          // Upload do arquivo para o Firebase Storage
          if (file) {
            const storageRef = storage.ref(`chats/${user.uid}/${file.name}`);
            const uploadTask = storageRef.put(file);
  
            uploadTask.on(
              "state_changed",
              null,
              (error) => {
                console.error("Erro ao enviar o arquivo: ", error);
                setError("Erro ao enviar o arquivo");
              },
              async () => {
                const fileURL = await uploadTask.snapshot.ref.getDownloadURL();
  
                // Envia a mensagem com o link do arquivo no chat existente com o hacker
                await chatDocRef.collection("messages").add({
                  message: `Arquivo enviado: <a href="${fileURL}" target="_blank">${file.name}</a>`,
                  user: user.email,
                  photoURL: user.photoURL,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
  
                setSuccess("Arquivo enviado com sucesso!");
              }
            );
          }
  
          setSuccess('Login realizado com sucesso!');
          setError('');
  
        } catch (loginError) {
          setError(`Erro ao tentar logar: O email e empresa não estão associados `);
          setSuccess('');
        } 
      } else if(error.code === 'auth/invalid-email') {
        setError('Erro: O endereço de mail não possui um formato válido')
        setSuccess('')
      } else if(error.code === 'auth/missing-email') {
        setError('Erro: O email é obrigatório')
        setSuccess('')
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
      <C.header>
        <p>
          Este é um Site <C.aHeader href="https://www.css-br.com">Castle</C.aHeader>, utilizado para fins de simulação, 
          em caso de dúvidas entre em contato conosco:  
          <C.aHeader href="mailto:contato@css-br.com.br?subject=Portal do Hacker&body=Conteúdo do email que será preenchido automaticamente"> contato@css-br.com.br</C.aHeader>

          </p>
      </C.header>
      <C.h2>Canal de suporte do grupo  </C.h2>
      <C.spanJigsaw>JIGSAW!</C.spanJigsaw>
      <C.jigsaw src={fotoJigsaw}></C.jigsaw>
      <C.div>
        <C.p>
          Seus sistemas e arquivos foram comprometidos? Sua empresa está inoperante? Aqui conseguiremos te ajudar!
          <br />
          Se chegou até aqui, você já deve saber o que está acontecendo. Mas caso não saiba, temos  um breve resumo para que você se situe sobre o que é um <C.a href="https://www.kaspersky.com.br/resource-center/threats/ransomware">RANSOMWARE</C.a>.
          <br />
          Só nós sabemos como descriptografar seus arquivos e voltar o funcionamento correto da sua empresa. Entre em contato com nosso suporte para informações sobre negociações, pagamento, garantia de devolução dos dados e maiores detalhes.
          Você também poderá submeter um arquivo comprometido para descriptografia, como amostra do nosso controle sobre os dados. <br></br>
        </C.p>
        
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
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      required
                    />
                  </div>
                  <div>
                    <label>Empresa:</label>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value.toLowerCase())}
                      required
                    />
                  </div>
                  <div>
                    <label>Arquivo:</label>
                    <input
                      type="file"
                      accept=".noaccess, .no-access, .narsw, .nalok, .jigsaw"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                    <br></br>
                    <br></br>
                    Extensões permitidas: .noaccess <C.span>/</C.span> .no-access <C.span>/</C.span> .narsw <C.span>/</C.span> .nalok <C.span>/</C.span> .jigsaw
                    <br></br>Tamanho máximo da amostra: <C.span>256kbps</C.span>
                  </div>
                  <br></br>
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
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </div>
              <div>
                <label>Empresa:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toLowerCase())}
                  required
                />
              </div>
              <br></br>
              <C.Button onClick={handleSignup}>Entrar</C.Button>
            {error && <p style={{ color: 'red', marginTop: '3vh' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '3vh' }}>{success}</p>}
            </C.Form>
          </C.divModal>
        )}
      </C.div>
      
    </C.Container>
  );
};

export default Login;