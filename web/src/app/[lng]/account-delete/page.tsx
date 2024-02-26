import { Button, Text } from "@chakra-ui/react";
import Section from "@/components/general/Section";
import { getIsAuthenticated } from "@/utils/auth";
import { ResultOf, graphql } from "@/graphql";
import PageWrapper from "../../../components/general/PageWrapper";
import { serverQuery } from "../../../apollo/server";
import Link from "../../../components/primitives/Link";
import { LocalizedPage } from "../../../types/page";
import { getTranslation } from "../../../i18n";
import { getPathnameServer } from "../../../utils/server";
import DeleteUserModalAndButton from "./DeleteUserModalAndButton";

const SomeQuery = graphql(`
  query AccountDeletePage_GetCurrentUser {
    getCurrentUser {
      id
      email
    }
  }
`);

export default async function Page({ params, searchParams }: LocalizedPage) {
  const { lng } = params;

  const { t } = await getTranslation(lng);
  const deleteSuccess = searchParams.delete_success === "true";
  const isAuthenticated = await getIsAuthenticated();
  let userData: ResultOf<typeof SomeQuery>["getCurrentUser"];
  if (isAuthenticated) {
    const userResult = await serverQuery({ query: SomeQuery });
    userData = userResult?.data.getCurrentUser;
  }
  //   const result = await serverQuery({ query: SomeQuery });
  // const userData = result?.data.getCurrentUser;

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
            <DeleteUserModalAndButton user={{ email: userData.email, id: userData.id }} />
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
