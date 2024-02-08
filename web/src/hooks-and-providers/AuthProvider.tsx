import React, { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = React.PropsWithChildren<{ initialIsAuthenticated: boolean }>;

function AuthProvider({ children, initialIsAuthenticated }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);

  return (
    <Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
