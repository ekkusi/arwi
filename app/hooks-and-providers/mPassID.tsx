import * as WebBrowser from "expo-web-browser";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { graphql } from "../gql";

const MPassID_Login_Mutation = graphql(`
  mutation MPassID_Login($code: String!) {
    mPassIDLogin(code: $code) {
      payload {
        userData {
          email
          languagePreference
          consentsAnalytics
          id
          isMPassIDConnected
        }
      }
    }
  }
`);

const BACKEND_API_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
if (!BACKEND_API_URL) throw new Error("Backend API URL not defined, define EXPO_PUBLIC_BACKEND_API_URL in .env");

export const useMPassIDAuth = (redirectUri: string) => {
  const [mPassIdLogin] = useMutation(MPassID_Login_Mutation);
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const grantCode = async () => {
    const authUrl = `${BACKEND_API_URL}/auth/authorize?${new URLSearchParams({ redirect_uri: redirectUri, type: "code_only" })}`;

    const authResult = (await WebBrowser.openAuthSessionAsync(authUrl, redirectUri)) as WebBrowser.WebBrowserRedirectResult;

    if (!authResult.url) return null;
    const code = authResult.url.split("code=")[1];

    return code;
  };

  const login = async () => {
    const code = await grantCode();
    if (!code) return null;
    const result = await mPassIdLogin({ variables: { code } });

    if (!result.data) throw new Error("Unexpected error, no user data");
    return result.data.mPassIDLogin;
  };

  return { login, grantCode };
};
