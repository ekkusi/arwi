import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "@/components/primitives/Link";

export default function PrivacyPolicyContentSe() {
  return (
    <>
      <Text as="h1">Integritetspolicy</Text>
      <Text>Vi beklagar att integritetspolicy inte finns tillgängliga på svenska. Klicka nedan för att läsa dem på finska.</Text>
      <Flex justifyContent="center" mt="5">
        <Link href="/tietosuojaseloste" noTranslate>
          <Button>Byt till finska</Button>
        </Link>
      </Flex>
    </>
  );
}
