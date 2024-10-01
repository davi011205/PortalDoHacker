import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import * as C from "./styles/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import Login from "./components/Login";
import Loading from "./components/Loading";

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [userChat, setUserChat] = useState(null);
  const [userData, setUserData] = useState(null);  // Adicionar estado para armazenar os dados do usuário

  useEffect(() => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);

      // Verifique se o documento do usuário já existe no Firestore
      userRef.get().then((doc) => {
        if (!doc.exists) {
          // Se o documento não existir, salve os dados do usuário, incluindo o nome
          userRef.set({
            email: user.email,
            photoURL: user.photoURL,
            nome: user.displayName  // Certifique-se de pegar o nome
          });
        } else {
          // Se já existir, obter os dados do documento
          setUserData(doc.data());
        }
      });
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return (
    <C.Container>
      <Sidebar setUserChat={setUserChat} userChat={userChat} userData={userData}/>
      <Chat userChat={userChat} userData={userData}/>
    </C.Container>
  );
};

export default App;