import React, { createContext, useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

type AuthState = {
  accessToken: string | null;
  authenticated: boolean;
  loading: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  authenticated: false,
  loading: true,
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
  const router = useRouter();

  // Need to use useCallback to prevent infinite render loops in components that depend on these (ApolloProvider at least).
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthState({
      accessToken: null,
      authenticated: false,
      loading: false,
    });
  }, []);

  const setToken = useCallback(async (token: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    console.log("setToken called");
    setAuthState({
      accessToken: token,
      authenticated: true,
      loading: false,
    });
  }, []);

  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
      .then((accessToken) => {
        if (accessToken) {
          setToken(accessToken);
          // router.replace("/");
        } else {
          setAuthState({ accessToken: null, authenticated: false, loading: false });
          // router.replace("/auth/welcome");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setToken]);

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
