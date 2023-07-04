import React, { createContext, useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [initialized, setInitialized] = useState(false);

  // Need to use useCallback to prevent infinite render loops in components that depend on these (ApolloProvider at least).
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthState({
      accessToken: null,
      authenticated: false,
    });
    router.replace("/LandingPage");
  }, [router]);

  const setToken = useCallback(async (token: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    setAuthState({
      accessToken: token,
      authenticated: true,
    });
  }, []);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
        .then((accessToken) => {
          if (accessToken) {
            setToken(accessToken).then(() => {
              router.replace("/HomeView");
            });
          } else {
            router.replace("/LandingPage");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [initialized, router, setToken]);

  // if (loading) return <LoadingIndicator />;

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
