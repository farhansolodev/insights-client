import React, { useEffect, useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth'
import { loadingMessages } from '../utils'

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    // const history = useHistory();
    // console.log("went thru auth provider")
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setPending(false)
            // user && history.push("/app")
            // user && history.push("/app")
        });
    }, []);

  if (pending){
      return <div style={{
          font: "1.5rem 'Roboto', sans-serif",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
      }}><h1>{loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}</h1></div>
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)