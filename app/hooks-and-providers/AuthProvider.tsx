import React, { createContext, useCallback, useState } from "react";
import { removeSessionId } from "../helpers/session";
import { FragmentOf, ResultOf, graphql, readFragment } from "@/graphql";

export const AuthProvider_UserInfo_Fragment = graphql(`
  fragment AuthProvider_UserInfo on Teacher {
    id
    email
    languagePreference
    consentsAnalytics
    isMPassIDConnected
    verifiedEmails
    isVerified
  }
`);

type UserInfo = ResultOf<typeof AuthProvider_UserInfo_Fragment>;

type AuthContextType = {
  user?: UserInfo;
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
  if (!context.user) throw new Error("User is not authenticated");
  return context.user;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, _setUser] = useState<UserInfo>();

  // Need to use useCallback to prevent infinite render loops in components that depend on these (ApolloProvider at least).
  const logout = useCallback(async () => {
    await removeSessionId();
    _setUser(undefined);
  }, []);

  const setUser = useCallback((newUser: FragmentOf<typeof AuthProvider_UserInfo_Fragment>) => {
    const userData = readFragment(AuthProvider_UserInfo_Fragment, newUser);
    _setUser(userData);
  }, []);

  return (
    <Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
