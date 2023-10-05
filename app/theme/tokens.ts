// NOTE: Logo font is Aileron thin

export const COLOR_PALETTE = {
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19",
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E",
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#65AF53",
    700: "#008775",
    800: "#046c4e",
    900: "#004440",
  },
} as const;

export const COLORS = {
  white: "#FEFCFB",
  "off-white": "#F3F4F6",
  // green: "#008775",
  orange: "#C05621",
  red: "#C53030",
  yellow: "#D69E2E",
  "light-green": "#86c078",
  green: "#65AF53",
  primary: "#65AF53",
  // primary: "#008775",
  // secondary: "#33414C",
  secondary: "#35352A",
  lightgray: "#D8D8D8",
  "extra-light-gray": "#ECECEC",

  gray: "#919191",
  // darkgray: "#17232c",
  black: "#000000",
  darkgray: "#35352A",
  sport: "#3a86ff",
  biology: "#fb5607",
  psychology: "#8338ec",
  art: "#ff006e",
  class: "#ffbe0b",
  error: "darkred",
  transparent: "transparent",
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
  title: 24,
  xl: 24,
  largeTitle: 28,
  "2xl": 28,
  "3xl": 36,
} as const;

export const SPACING = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 18,
  "2xl": 24,
  "3xl": 32,
  "4xl": 64,
  "5xl": 128,
  "-xxs": -2,
  "-xs": -4,
  "-sm": -6,
  "-md": -8,
  "-lg": -12,
  "-xl": -18,
  "-2xl": -24,
  "-3xl": -32,
  "-4xl": -64,
  "-5xl": -128,
} as const;
