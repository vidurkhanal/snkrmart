import { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// Add your Firebase credentials
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCrKhh0X2Hzn-myoV_MF5luHY7brJwYcsk",
    authDomain: "snkrmartt.firebaseapp.com",
    databaseURL: "https://snkrmartt.firebaseio.com",
    projectId: "snkrmartt",
    storageBucket: "snkrmartt.appspot.com",
    messagingSenderId: "49356319882",
    appId: "1:49356319882:web:405dee189e204005aa9173",
  });
}

export const db = firebase.firestore()

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            setUser(response.user);
            return response.user;
          });
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };
  const router = useRouter();

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        setUser(response.user);
        router.push("/");
        return response.user;
      });
  };


  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        Cookies.set("isLoggedInToSnkrMart", true, { expires: 7 });
      } else {
        Cookies.remove("isLoggedInToSnkrMart");
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    loginWithGoogle,
    
  };
}
