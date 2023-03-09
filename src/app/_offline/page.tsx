import { Button, NextLink, Text } from "@/components/chakra";
import PageWrapper from "../(server-components)/PageWrapper";

export default function OfflinePage() {
  return (
    <PageWrapper>
      <Text as="h1">Ei yhteyttä:(</Text>
      <Text mb="3">
        Valitetttavasti Arwi ei toistaiseksi pysty auttamaan ilman bittien
        virtaamista internettiin. Palauta yhteys ja napauta alta, niin pääset
        takaisin Arwioimaan.
      </Text>
      <Button as={NextLink} href="/">
        Takaisin touhuamaan
      </Button>
    </PageWrapper>
  );
}
