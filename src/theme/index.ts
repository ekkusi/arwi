"use client";

import {
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Button, FormLabel, Input } from "./components";

const colors = {
  "light-gray": baseTheme.colors.gray["100"],
  "medium-gray": baseTheme.colors.gray["200"],
  // TODO: Should probably configure other reds as well, this only changes red.500 (which is used in errors)
  red: {
    500: baseTheme.colors.red["700"],
  },
};

const theme = extendTheme(
  {
    fonts: {
      heading: `Raleway, sans-serif`,
      body: `'Open Sans', sans-serif`,
      // body: "Raleway",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    colors,
    styles: {
      global: () => ({
        "html, body, #root": {
          margin: 0,
          width: "100%",
          overflowX: "hidden",
          color: "black",
          bg: colors["light-gray"],
        },
        body: {
          fontSize: { base: "md", md: "lg" },
        },
        "h1, h2, h3": {
          fontFamily: theme.fonts.heading,
        },
        h1: {
          fontSize: { base: "3xl", md: "4xl" },
        },
        h2: {
          fontSize: { base: "2xl", md: "3xl" },
        },
        h3: {
          fontSize: { base: "xl", md: "2xl" },
        },
      }),
    },
    shadows: {
      custom: "2px 2px 0px 0px black",
    },
    components: {
      Button,
      Input,
      FormLabel,
    },
  },
  withDefaultColorScheme({ colorScheme: "green" })
);

export default theme;
