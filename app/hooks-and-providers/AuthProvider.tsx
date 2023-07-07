import React, { createContext, useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserInfo } from "arwi-backend/src/types/contextTypes";

type AuthState = {
  accessToken: string | null;
  authenticated: boolean;
  user: UserInfo | null;
};

const initialState: AuthState = {
  accessToken: null,
  authenticated: false,
  user: null,
};

type AuthContextType = {
  authState: AuthState;
  setUser: (token: string, user: UserInfo) => Promise<void>;
  logout: () => void;
};

export const ACCESS_TOKEN_KEY = "accessToken";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

export const useAuthenticatedUser = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthenticatedUser must be used within an AuthProvider");
  }
  if (!context.authState.user) throw new Error("User is not authenticated");
  return context.authState.user;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Need to use useCallback to prevent infinite render loops in components that depend on these (ApolloProvider at least).
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthState({
      accessToken: null,
      authenticated: false,
      user: null,
    });
  }, []);

  const setUser = useCallback(async (token: string, user: UserInfo) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    setAuthState({
      accessToken: token,
      user,
      authenticated: true,
    });
  }, []);

  return (
    <Provider
      value={{
        authState,
        setUser,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
