import { Box, Text } from "@chakra-ui/react";
import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import Link from "@/components/primitives/Link";
import { getTranslation } from "@/i18n";

export default async function Home({ params }: LocalizedPage) {
  const { lng } = params;
  const { t } = await getTranslation(lng);

  return (
    <PageWrapper
      flex={1}
      display="flex"
      position="relative"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      mb="-8"
      px="4"
      pb={{ base: "16", md: "8" }}
    >
      <Text as="h1" fontWeight="thin" mb="3">
        {t("coming-soon", "Tulossa pian")}
      </Text>
      <Text as="span" fontWeight="thin" marginBottom="12" maxWidth={500} textAlign="center">
        {t("home.page-under-construction-description", "Malta hetki - sivuja työstetään parhaillaan. Sillä välin voit ottaa yhteyttä alta.")}
      </Text>
      <Box textAlign="center" mt="5">
        <Text as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="thin" marginBottom="2">
          {t("contact-us", "Ota yhteyttä")}
        </Text>
        <Link
          fontSize={{ base: "4xl", md: "5xl" }}
          href="mailto:info@arwi.fi"
          fontWeight="light"
          noTranslate
          hoverStyle="underline"
          underLineSize="2px"
        >
          info@arwi.fi
        </Link>
      </Box>
    </PageWrapper>
  );
}
