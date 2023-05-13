import { Button, Flex, Text } from "@chakra-ui/react";
import PageWrapper from "@/components/server-components/PageWrapper";
import CenteredContainer from "@/components/server-components/primitives/CenteredContainer";
import Link from "next/link";

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
          <Button as={Link} href="/">
            Aloita arviointi
          </Button>
        </Flex>
      </CenteredContainer>
    </PageWrapper>
  );
}