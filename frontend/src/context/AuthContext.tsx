import React, { createContext, useState, ReactNode, useContext } from "react";

export interface User {
  _id: string;
  fullName: string;
  profilePic: string;
}

interface AuthContextType {
  authUser: User | null; // Allow null for when there is no user
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>; // Allow null in the setter
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("chat-user") || "null")
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
