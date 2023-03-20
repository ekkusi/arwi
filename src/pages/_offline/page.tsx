import { Button, Text } from "@chakra-ui/react";
import PageWrapper from "@/components/server-components/PageWrapper";
import NoPrefetchLink from "@/components/general/NoPrefetchLink";

export default function OfflinePage() {
  return (
    <PageWrapper>
      <Text as="h1">Ei yhteyttä:(</Text>
      <Text mb="3">
        Valitetttavasti Arwi ei toistaiseksi pysty auttamaan ilman bittien
        virtaamista internettiin. Palauta yhteys ja napauta alta, niin pääset
        takaisin Arwioimaan.
      </Text>
      <Button as={NoPrefetchLink} href="/">
        Takaisin touhuamaan
      </Button>
    </PageWrapper>
  );
}
