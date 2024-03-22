import React, { createContext, useCallback, useState } from "react";
import { Teacher } from "arwi-backend/src/types";
import { removeSessionId } from "../helpers/session";
import { FragmentOf, graphql, readFragment } from "@/graphql";

export const AuthProvider_UserInfo_Fragment = graphql(`
  fragment AuthProvider_UserInfo on Teacher {
    id
    email
    languagePreference
    consentsAnalytics
    isMPassIDConnected
    verifiedEmails
  }
`);

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
  setUser: (user: FragmentOf<typeof AuthProvider_UserInfo_Fragment>) => void;
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

  const setUser = useCallback((user: FragmentOf<typeof AuthProvider_UserInfo_Fragment>) => {
    const userData = readFragment(AuthProvider_UserInfo_Fragment, user);
    setAuthState({
      user: userData,
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
