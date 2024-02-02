"use client";

import { useMutation } from "@apollo/client";
import { Button, Input, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatLocalizedPath, getPathFromRoute } from "@/utils/route";
import { LocalizedPage } from "@/types/page";
import PageWrapper from "@/components/general/PageWrapper";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../utils/errorUtils";
import { useAuth } from "../../../hooks-and-providers/AuthProvider";
import FormField from "../../../components/general/FormField";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginPage_Login_Mutation = graphql(`
  mutation LoginPage_Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userData {
        email
        id
        languagePreference
        consentsAnalytics
        isMPassIDConnected
      }
    }
  }
`);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { setIsAuthenticated } = useAuth();

  const redirectUriLogin = searchParams.get("redirect_uri");
  const redirectedFromUnauthenticated = searchParams.get("from_unauthenticated") === "true" || false;

  // const redirectUriMPassID = `http://localhost:3000${formatLocalizedPath(pathname, lng)}`;

  const [loginMutation, { loading: isLoginLoading }] = useMutation(LoginPage_Login_Mutation);

  const login = async () => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      if (!data) return;

      setIsAuthenticated(true);

      if (redirectUriLogin) {
        router.push(redirectUriLogin);
        router.refresh();
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <PageWrapper py="5">
      {redirectedFromUnauthenticated && (
        <Text fontStyle="italic">
          {t("login.session-expired-login-again", "Kirjautumistietosi ovat vanhentuneet. Kirjaudu sovellukseen uudelleen.")}
        </Text>
      )}
      <Text as="h1">{t("login", "Kirjaudu sisään")}</Text>
      <Text>{t("name", "Nimi")}</Text>
      <Input type="email" value={email} placeholder="teppo.testaaja@email.com" onChange={(e) => setEmail(e.target.value)} mb="4" />
      <Text>{t("password", "Salasana")}</Text>
      <Input type="password" value={password} placeholder="********" onChange={(e) => setPassword(e.target.value)} mb="6" />
      {error && <Text color="red">{error}</Text>}
      <Button onClick={login} isLoading={isLoginLoading}>
        {t("login", "Kirjaudu sisään")}
      </Button>
    </PageWrapper>
  );
}
