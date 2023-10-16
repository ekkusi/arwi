"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "@/components/primitives/Link";

export default function PrivacyPolicyContentEn() {
  return (
    <>
      <Text as="h1">Privacy Policy</Text>
      <Text>Apologies, the privacy policy document still isnt yet available in English. Click below to read them in Finnish.</Text>
      <Flex justifyContent="center" mt="5">
        <Link href="/tietosuojaseloste" noTranslate>
          <Button>Switch to Finnish</Button>
        </Link>
      </Flex>
    </>
  );
}
