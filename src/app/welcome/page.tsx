import { Box, Button, NextLink, Text } from "@/components/chakra";
import PageWrapper from "../(components)/PageWrapper";

export default function WelcomePage() {
  return (
    <PageWrapper>
      <Box
        position="absolute"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%"
      >
        <Text as="h1" textAlign="center" fontSize="5xl">
          Tervetuloa!
        </Text>
        <Text mb="5" textAlign="center">
          Mahtavata saada sinut mukaan toteuttamaan laadukkaampaa arviointia:)
        </Text>
        <Button as={NextLink} href="/" mx="auto">
          Aloita arviointi
        </Button>
      </Box>
    </PageWrapper>
  );
}
