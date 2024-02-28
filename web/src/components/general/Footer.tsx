"use client";

import { Text, Box, BoxProps, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/client";
import CenteredContainer from "../primitives/CenteredContainer";
import Link from "../primitives/Link";
import ChakraIcon from "../primitives/LazyIcon";

export type FooterProps = BoxProps & {
  isDecorationFixed?: boolean;
  extraContent?: React.ReactNode;
  containerProps?: BoxProps;
};

const WAVE_MARGIN = { base: 3, md: 12, lg: 20, xl: 28, "2xl": 36 };
const FIXED_WAVE_MARGIN = {
  base: WAVE_MARGIN.base * -1,
  md: WAVE_MARGIN.md * -1,
  lg: WAVE_MARGIN.lg * -1,
  xl: WAVE_MARGIN.xl * -1,
  "2xl": WAVE_MARGIN["2xl"] * -1,
};

export default function Footer({ extraContent, containerProps, isDecorationFixed = false, ...rest }: FooterProps) {
  const { t } = useTranslation();

  const footerContentRef = useRef(null); // Create a ref for the Flex component

  const [isInView, setIsInView] = useState(false);
  const isInViewRef = useRef(isInView);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    if (!isDecorationFixed) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyInView = isInViewRef.current;
          if (entry.isIntersecting) {
            if (isCurrentlyInView) return;
            // Element is at the bottom of the viewport
            setIsInView(true);
          } else if (isCurrentlyInView) {
            setIsInView(false);
          }
        });
      },
      {
        root: null, // setting root to null sets it to the viewport
        rootMargin: "0px",
        threshold: 0, // Adjust this value if needed
      }
    );

    if (footerContentRef.current) {
      observer.observe(footerContentRef.current); // Start observing the Flex component
    }

    return () => {
      observer.disconnect(); // Clean up the observer on component unmount
    };
  }, [isDecorationFixed]); // Empty array ensures the effect runs only once

  return (
    <>
      {isDecorationFixed && (
        <Box
          aspectRatio="960/200"
          mb={FIXED_WAVE_MARGIN}
          position="fixed"
          left={0}
          right={0}
          bottom={0}
          backgroundColor="transparent"
          zIndex={2}
          pointerEvents="none"
        >
          <Image src="/images/layered-wave-bottom-1.svg" fill alt="Waves" />
        </Box>
      )}
      <Box as="footer" position="relative" marginTop="auto" zIndex={isInView ? 3 : 1} {...containerProps} {...rest}>
        <Box aspectRatio="960/200" position="relative">
          <Box position="absolute" top="0" left="0" right="0" bottom="0" width="100%" height="100%" mt={isDecorationFixed ? WAVE_MARGIN : "0"}>
            <Image src="/images/layered-wave-bottom-1.svg" fill alt="Waves" />
          </Box>
        </Box>
        <Box ref={footerContentRef} paddingTop={isDecorationFixed ? WAVE_MARGIN : 0} bg="primary" width="100%" color="white">
          {extraContent && (
            <Box width="100%" bg="primary">
              {extraContent}
            </Box>
          )}
          <Flex
            position="relative"
            px="5"
            pb="7"
            pt={{
              base: "8",
              md: "7",
            }}
            bg="primary"
            justifyContent="space-between"
            alignItems={{
              base: "center",
              md: "top",
            }}
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
            <CenteredContainer visibility={{ base: "hidden", md: "visible" }}>
              <Link href="/" fontSize="4xl" color="white" fontWeight="thin">
                arwi
              </Link>
            </CenteredContainer>
            <Link
              color="white"
              fontWeight="300"
              display="flex"
              alignItems="center"
              href="https://www.instagram.com/arwi.fi/"
              noTranslate
              mt={{ base: 6, md: 0 }}
            >
              <ChakraIcon icon="FiInstagram" fetchFromReactIcons width={5} height={5} mr="3px" mb="0" />
              arwi.fi
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
