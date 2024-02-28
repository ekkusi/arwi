"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type FooterBaseProps = BoxProps & {
  isWaveFixed?: boolean;
};

const WAVE_MARGIN = { base: 3, md: 12, lg: 20, xl: 28, "2xl": 36 };
const FIXED_WAVE_MARGIN = {
  base: WAVE_MARGIN.base * -1,
  md: WAVE_MARGIN.md * -1,
  lg: WAVE_MARGIN.lg * -1,
  xl: WAVE_MARGIN.xl * -1,
  "2xl": WAVE_MARGIN["2xl"] * -1,
};

export default function FooterBase({ isWaveFixed = false, children, ...rest }: FooterBaseProps) {
  const footerContentRef = useRef(null); // Create a ref for the Flex component

  const [isInView, setIsInView] = useState(false);
  const isInViewRef = useRef(isInView);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    if (!isWaveFixed) return;
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
  }, [isWaveFixed]); // Empty array ensures the effect runs only once

  return (
    <>
      {isWaveFixed && (
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
      <Box as="footer" position="relative" marginTop="auto" zIndex={isInView ? 3 : 1} {...rest}>
        <Box aspectRatio="960/200" position="relative">
          <Box position="absolute" top="0" left="0" right="0" bottom="0" width="100%" height="100%" mt={isWaveFixed ? WAVE_MARGIN : "0"}>
            <Image src="/images/layered-wave-bottom-1.svg" fill alt="Waves" />
          </Box>
        </Box>
        <Box ref={footerContentRef} paddingTop={isWaveFixed ? WAVE_MARGIN : 0} bg="primary" width="100%" color="white">
          {children}
        </Box>
      </Box>
    </>
  );
}
