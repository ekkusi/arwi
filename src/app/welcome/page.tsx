import { Button, Flex, NextLink, Text } from "@/components/chakra";
import PageWrapper from "../(server-components)/PageWrapper";
import CenteredContainer from "../(server-components)/primitives/CenteredContainer";

export default function WelcomePage() {
  return (
    <PageWrapper>
      <CenteredContainer>
        <Text as="h1" textAlign="center" fontSize="5xl">
          Tervetuloa!
        </Text>
        <Text mb="5" textAlign="center">
          Mahtavata saada sinut mukaan toteuttamaan laadukkaampaa arviointia:)
        </Text>
        <Flex justifyContent="center">
          <Button as={NextLink} href="/">
            Aloita arviointi
          </Button>
        </Flex>
      </CenteredContainer>
    </PageWrapper>
  );
}
