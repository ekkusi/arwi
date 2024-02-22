import { Button, Text } from "@chakra-ui/react";
import PageWrapper from "@/components/general/PageWrapper";
import { getTranslation } from "@/i18n";
import TranslatedLink from "@/components/primitives/Link";
import { getLocaleServer } from "@/utils/server";
import Section from "@/components/general/Section";

export default async function NotFoundPage() {
  const lng = getLocaleServer() || "fi";
  const { t } = await getTranslation(lng);

  return (
    <PageWrapper>
      <Section display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb="8">
        <Text as="h1">{t("oops", "Huppista!")}</Text>
        <Text mb="5">{t("page-not-found", "Hakemaasi sivua ei löytynyt. Palaa etusivulle alta.")}</Text>
        <TranslatedLink href="/">
          <Button>{t("return-to-home", "Palaa etusivulle")}</Button>
        </TranslatedLink>
      </Section>
    </PageWrapper>
  );
}
