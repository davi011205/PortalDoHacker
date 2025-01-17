import React, { useState, useRef } from "react";
import * as C from "./styles";
import { MdSend } from "react-icons/md";
import { auth, db, storage } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

const ChatFooter = ({ chatId }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); 

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (file) {
      const storageRef = storage.ref(`chats/${chatId}/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Erro ao enviar o arquivo: ", error);
        },
        async () => {
          const fileURL = await uploadTask.snapshot.ref.getDownloadURL();

          // Enviar mensagem com o link do arquivo
          await db.collection("chats").doc(chatId).collection("messages").add({
            message: `Arquivo enviado: <a href="${fileURL}" target="_blank">${file.name}</a>`,
            user: user.email,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

          setMessage("");
          setFile(null); // Limpa o estado do arquivo
          fileInputRef.current.value = ""; // Limpa o campo de input
        }
      );
    } else {
      if (message) {
        db.collection("chats").doc(chatId).collection("messages").add({
          message: message,
          user: user.email,
          photoURL: user.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setMessage("");
      }
    }
  };

  return (
    <C.Container>
      <C.Form onSubmit={handleSendMessage}>
        <C.Input
          placeholder="Mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <C.InputFile
          type="file"
          accept = {
            user?.email === "hacker@css.com"
              ? ""
              : ".noaccess, .no-access, .narsw, .nalok, .jigsaw"
          }
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
        />
        <MdSend onClick={handleSendMessage} style={{ cursor: "pointer" }} />
      </C.Form>
    </C.Container>
  );
};

export default ChatFooter;
