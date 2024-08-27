import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { PropsWithChildren, createContext } from "react";
import { auth } from "../services/firebase";

// Define the shape of the Auth context
interface AuthType {
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Create the Auth context
export const AuthContext = createContext<AuthType | null>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Define the signup function
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Create an object that matches the AuthType interface
  const authContextValue: AuthType = {
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
