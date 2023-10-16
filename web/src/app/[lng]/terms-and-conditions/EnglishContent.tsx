"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "@/components/primitives/Link";

export default function TermsAndConditionsContentEn() {
  return (
    <>
      <Text as="h1">Terms and conditions</Text>
      <Text>Apologies, the terms and conditions are still not available in English. Click below to read them in Finnish.</Text>
      <Flex justifyContent="center" mt="5">
        <Link href="/kayttoehdot" noTranslate>
          <Button>Switch to Finnish</Button>
        </Link>
      </Flex>
    </>
  );
}
