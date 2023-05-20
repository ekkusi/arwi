// AuthContext.js
import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  accessToken: string | null;
  authenticated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  authenticated: false,
};

type AuthContextType = {
  authState: AuthState;
  setToken: (token: string) => void;
  logout: () => void;
};

export const ACCESS_TOKEN_KEY = "accessToken";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const logout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
  };

  const setToken = async (token: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    setAuthState({
      accessToken: token,
      authenticated: true,
    });
  };

  return (
    <Provider
      value={{
        authState,
        setToken,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
