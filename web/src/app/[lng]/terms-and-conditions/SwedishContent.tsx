import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "@/components/primitives/Link";

export default function TermsAndConditionsContentSe() {
  return (
    <>
      <Text as="h1">Användarvillkoren</Text>
      <Text>Vi beklagar att användarvillkoren inte finns tillgängliga på svenska. Klicka nedan för att läsa dem på finska.</Text>
      <Flex justifyContent="center" mt="5">
        <Link href="/kayttoehdot" noTranslate>
          <Button>Byt till finska</Button>
        </Link>
      </Flex>
    </>
  );
}
