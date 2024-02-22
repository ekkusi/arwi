import { Button, Text } from "@chakra-ui/react";
import Section from "@/components/general/Section";
import PageWrapper from "../../../components/general/PageWrapper";
import { graphql } from "../../../gql";
import { serverQuery } from "../../../apollo/server";
import Link from "../../../components/primitives/Link";
import { LocalizedPage } from "../../../types/page";
import { getTranslation } from "../../../i18n";
import { getIsAuthenticated, getPathnameServer } from "../../../utils/server";
import DeleteUserModalAndButton from "./DeleteUserModalAndButton";
import { AccountDeletePage_GetCurrentUserQuery } from "../../../gql/graphql";

const AccountDeletePage_GetCurrentUser_Query = graphql(`
  query AccountDeletePage_GetCurrentUser {
    getCurrentUser {
      email
      id
    }
  }
`);

export default async function Page({ params, searchParams }: LocalizedPage) {
  const { lng } = params;

  const { t } = await getTranslation(lng);
  const deleteSuccess = searchParams.delete_success === "true";
  const isAuthenticated = getIsAuthenticated();

  let userData: AccountDeletePage_GetCurrentUserQuery["getCurrentUser"] | undefined;
  if (isAuthenticated) {
    const userResult = await serverQuery({ query: AccountDeletePage_GetCurrentUser_Query });
    userData = userResult?.data.getCurrentUser;
  }

  const renderAuthContent = () => {
    if (isAuthenticated && userData) {
      if (userData.email)
        return (
          <>
            <Text mb="4">
              {t(
                "account-delete.delete-account-by-clicking-below",
                "Voit poistaa käyttäjäsi ja kaikki siihen liittyvät tiedot klikkaamaalla alta sekä varmistamalla poisto."
              )}
            </Text>
            <DeleteUserModalAndButton user={{ email: userData.email!, id: userData.id }} />
          </>
        );
      return (
        <Text>
          {t(
            "account-delete.delete-not-available-for-mpassid",
            "Käyttäjän poisto ei valitettavasti ole tällä hetkellä saatavilla MPassID-tunnuksille. Ota yhteyttä järjestelmänvalvontaan info@arwi.fi poistaaksesi tunnuksesi."
          )}
        </Text>
      );
    }
    return (
      <>
        <Text>{t("account-delete.login-to-delete", "Poistaaksesi tietosi sinun täytyy kirjautua sisään.")}</Text>
        <Button as={Link} href="/login" queryParams={{ redirect_uri: getPathnameServer() }}>
          {t("login", "Kirjaudu sisään")}
        </Button>
      </>
    );
  };

  return (
    <PageWrapper>
      <Section mt={{ base: "8", xl: "20" }}>
        {deleteSuccess && <Text color="primary">{t("account-delete.delete-successful", "Käyttäjä poistettu onnistuneesti!")}</Text>}
        <Text as="h1">{t("account-delete.account-deletion", "Käyttäjän poisto")}</Text>
        {renderAuthContent()}
      </Section>
    </PageWrapper>
  );
}
