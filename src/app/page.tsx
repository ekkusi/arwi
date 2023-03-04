import { Button, Flex, NextLink, Text } from "@/components/chakra";
import PageWrapper from "./(server-components)/PageWrapper";
import CenteredContainer from "./(server-components)/primitives/CenteredContainer";

export default async function Home() {
  return (
    <PageWrapper hasNavigation={false}>
      <Text as="h1" textAlign="center" mt="12">
        ARWI
      </Text>
      <CenteredContainer as={Flex} flexDirection="column" textAlign="center">
        <Text mb="5">Tervetuloa käyttelemään open parasta ystävää</Text>
        <Button as={NextLink} href="/login">
          {"Siirry kirjautumaan \u2B95"}
        </Button>
      </CenteredContainer>
    </PageWrapper>
  );
}
