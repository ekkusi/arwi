"use client";

import { extendTheme, theme as baseTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { Accordion, Button, FormLabel, Input, Link, Tag, Textarea, Checkbox, Popover, Radio } from "./components";

const errorColor = baseTheme.colors.red["700"];

const themeOverrides = {
  purple: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#4C1D95",
  },
  blue: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

export const DEFAULT_COLOR_SCHEME = "green";

const colors = {
  ...themeOverrides,
  "light-gray": themeOverrides.gray["100"],
  "medium-gray": themeOverrides.gray["200"],
  text: "black",
  "light-text": themeOverrides.gray["700"],
  "secondary-bg": themeOverrides.blue["100"],
  // "secondary-bg": baseTheme.colors.yellow["100"],
  "primary-bg": baseTheme.colors[DEFAULT_COLOR_SCHEME]["100"],

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
      special: `Glegoo, sans-serif`,
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
          height: "100%",
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
          fontSize: { base: "2xl", md: "3xl" },
          textAlign: "center",
          mb: 5,
        },
        h2: {
          fontSize: { base: "xl", md: "2xl" },
          mb: 2,
        },
        h3: {
          fontSize: { base: "lg", md: "xl" },
          mb: 2,
        },
        a: {
          color: `${DEFAULT_COLOR_SCHEME}.500`,
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
      Accordion,
      Checkbox,
      Popover,
      Radio,
    },
  },
  withDefaultColorScheme({ colorScheme: DEFAULT_COLOR_SCHEME })
);

export default theme;
