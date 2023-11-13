"use client";

import { Text, Box, BoxProps, Flex, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { FiInstagram } from "@/components/react-icons/fi";
import { useTranslation } from "@/i18n/client";
import CenteredContainer from "../primitives/CenteredContainer";
import Link from "../primitives/Link";

export type FooterProps = BoxProps;

export default function Footer(props: FooterProps) {
  const { t } = useTranslation();
  return (
    <Box as="footer" position="relative" marginTop="auto" {...props}>
      <Box aspectRatio="960/200" mb="-3" position="relative">
        <Image src="/images/layered-wave-bottom-1.svg" fill alt="Waves" />
      </Box>
      <Flex
        position="relative"
        px="5"
        pb="7"
        pt={{
          base: "8",
          md: 0,
        }}
        bg="primary"
        color="white"
        justifyContent="space-between"
        alignItems={{
          base: "center",
          md: "top",
        }}
        marginTop="auto"
        fontFamily="brand"
        fontSize="sm"
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Flex alignItems="center">
          <Text as="span">© Arwi 2023</Text>
          <Text as="span" mx="3" fontSize="xl">
            |
          </Text>
          <Link href="/terms-and-conditions" color="white" fontWeight="light" hoverStyle="underline">
            {t("terms-and-conditions", "Käyttöehdot")}
          </Link>
          <Text as="span" mr="1" ml="2">
            |
          </Text>
          <Link href="/privacy-policy" color="white" fontWeight="light" hoverStyle="underline">
            {t("privacy-policy", "Tietosuojaseloste")}
          </Link>
        </Flex>
        <CenteredContainer visibility={{ base: "hidden", md: "visible" }} top="12px">
          <Link href="/">
            <Text fontSize="4xl" color="white" fontWeight="thin">
              arwi
            </Text>
          </Link>
        </CenteredContainer>
        <Link
          color="white"
          fontWeight="300"
          display="flex"
          alignItems="center"
          mt={{ base: "8", md: 0 }}
          href="https://www.instagram.com/arwi.fi/"
          noTranslate
        >
          <Icon as={FiInstagram} width={5} height={5} mr="3px" mb="0" />
          arwi.fi
        </Link>
      </Flex>
    </Box>
  );
}
