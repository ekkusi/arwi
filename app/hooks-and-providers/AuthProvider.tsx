import React, { createContext, useCallback, useState } from "react";
import { Teacher } from "arwi-backend/src/types";
import { removeSessionId } from "../helpers/session";

type UserInfo = Omit<Teacher, "passwordHash" | "groups" | "monthlyTokensUsed">;

type AuthState = {
  authenticated: boolean;
  user?: UserInfo;
};

const initialState: AuthState = {
  authenticated: false,
  user: undefined,
};

type AuthContextType = {
  authState: AuthState;
  setUser: (user: UserInfo) => void;
  logout: () => void;
};

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
    await removeSessionId();
    setAuthState({
      authenticated: false,
      user: undefined,
    });
  }, []);

  const setUser = useCallback((user: UserInfo) => {
    setAuthState({
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
