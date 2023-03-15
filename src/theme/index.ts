"use client";

import {
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Button, FormLabel, Input, Link, Tag, Textarea } from "./components";

const errorColor = baseTheme.colors.red["700"];

const colors = {
  "light-gray": baseTheme.colors.gray["100"],
  "medium-gray": baseTheme.colors.gray["200"],
  "secondary-bg": baseTheme.colors.yellow["100"],
  "primary-bg": baseTheme.colors.green["100"],
  // TODO: Should probably configure other reds as well, this only changes red.500 (which is used in errors)
  red: {
    500: errorColor,
  },
  error: errorColor,
};

const theme = extendTheme(
  {
    // TODO: Configure fonts by using @next/font to optimize performance
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
          WebkitTapHighlightColor: "transparent",
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
          mb: 5,
        },
        h2: {
          fontSize: { base: "2xl", md: "3xl" },
          mb: 2,
        },
        h3: {
          fontSize: { base: "xl", md: "2xl" },
          mb: 2,
        },
        a: {
          color: "green.800",
          fontWeight: "semibold",
        },
      }),
    },
    shadows: {
      custom: "2px 2px 0px 0px black",
    },
    components: {
      Button,
      Input,
      Textarea,
      FormLabel,
      Link,
      Tag,
    },
  },
  withDefaultColorScheme({ colorScheme: "green" })
);

export default theme;
