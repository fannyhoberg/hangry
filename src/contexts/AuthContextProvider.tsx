import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

// Define the shape of the Auth context
interface AuthType {
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  reloadUser: () => boolean;
  setEmail: (email: string) => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  setPhotoUrl: (url: string) => Promise<void>;
  currentUser: User | null;
  userEmail: string | null;
  userName: string | null;
  userPhotoUrl: string | null;
}

// auth context
export const AuthContext = createContext<AuthType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = () => {
    if (!currentUser) {
      return false;
    }

    setUserName(currentUser.displayName);
    setUserEmail(currentUser.email);
    setUserPhotoUrl(currentUser.photoURL);

    return true;
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Unauthorised, you are not logged in");
    }

    return updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("Unauthorised, you are not logged in");
    }

    return updatePassword(currentUser, password);
  };

  const setDisplayName = (name: string) => {
    if (!currentUser) {
      throw new Error("Unauthorised, you are not logged in");
    }

    return updateProfile(currentUser, {
      displayName: name,
    });
  };

  const setPhotoUrl = (url: string) => {
    if (!currentUser) {
      throw new Error("Unauthorised, you are not logged in");
    }

    return updateProfile(currentUser, { photoURL: url });
  };

  // cleanup baybeeee
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserPhotoUrl(user.photoURL);
      } else {
        setUserEmail(null);
        setUserName(null);
        setUserPhotoUrl(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authContextValue: AuthType = {
    signup,
    login,
    logout,
    reloadUser,
    setEmail,
    setPassword,
    setDisplayName,
    setPhotoUrl,
    currentUser,
    userName,
    userEmail,
    userPhotoUrl,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? (
        <div>
          <span className="visibility-hidden">Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
