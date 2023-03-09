import { Box, Text } from "@/components/chakra";
import PageWrapper from "./PageWrapper";

export default function ErrorPageWrapper({
  children,
}: React.ComponentProps<"div">) {
  return (
    <PageWrapper>
      <Box maxWidth={{ base: "100%", lg: "1000px" }} mx="auto" pt="16">
        <Text as="h1" textAlign="center">
          Hupsista!
        </Text>
        <Text mb="5">
          Jotakin jännää taisi päästä käymään. Voipi olla, että järjestelmässä
          on joku bugi luuraamassa. Jos palaat tälle sivulle yhtenään, ota
          yhteyttä järjestelmän ylläpitäjään.
        </Text>
        {children}
      </Box>
    </PageWrapper>
  );
}
