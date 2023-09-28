import { headers } from "next/headers";
import { Box, Button, Flex, Text } from "@/components/chakra";
import Image from "@/components/general/Image";
import PageWrapper from "@/components/server/PageWrapper";
import { getTranslation } from "@/i18n";
import { extractLocaleFromPath } from "@/utils/route";
import TranslatedLink from "@/components/server/TranslatedLink";
import CenteredContainer from "@/components/server/primitives/CenteredContainer";

export default async function NotFoundPage() {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("x-url") || "";
  const urlParts = fullUrl.split(domain);
  const pathName = urlParts[urlParts.length - 1];

  const lng = extractLocaleFromPath(pathName) || "fi";
  const { t } = await getTranslation(lng);

  return (
    <PageWrapper width="100%" display="flex" flexDirection="column" alignItems="center" pt="20">
      <CenteredContainer pb="20">
        <Text as="h1">{t("oops", "Huppista!")}</Text>
        <Text mb="5">{t("page-not-found", "Hakemaasi sivua ei löytynyt. Palaa etusivulle alta.")}</Text>
        <TranslatedLink href="/">
          <Button>{t("return-to-home", "Palaa etusivulle")}</Button>
        </TranslatedLink>
      </CenteredContainer>
      <Text fontFamily="brand" fontSize="7xl" color="green" marginTop="auto">
        arwi
      </Text>
    </PageWrapper>
  );
}
