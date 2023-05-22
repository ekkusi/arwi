import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES } from "./config";
import { CImageStyle, CTextStyle, CViewStyle, IMAGE_COLOR_PROP_KEYS, TEXT_COLOR_PROP_KEYS, VIEW_COLOR_PROP_KEYS } from "./types";

export function createTextStyles(styles: CTextStyle): TextStyle {
  const newStyles: TextStyle = {};

  const objKeys = Object.keys(styles) as (keyof CTextStyle)[];

  objKeys.forEach((key) => {
    if (key === "fontSize") {
      const newValue = typeof styles[key] === "number" ? (styles[key] as number) : FONT_SIZES[styles[key] as keyof typeof FONT_SIZES];
      newStyles[key] = newValue;
    } else if (key in TEXT_COLOR_PROP_KEYS) {
      const typedKey = key as (typeof TEXT_COLOR_PROP_KEYS)[number];
      const newValue = typeof styles[typedKey] === "string" ? styles[typedKey] : COLORS[styles[typedKey] as keyof typeof COLORS];
      newStyles[typedKey] = newValue;
    } else {
      // @ts-ignore
      newStyles[key] = styles[key];
    }
  });

  return newStyles;
}

export function createImageStyles(styles: CImageStyle): ImageStyle {
  const newStyles: ImageStyle = {};

  const objKeys = Object.keys(styles) as (keyof CImageStyle)[];

  objKeys.forEach((key) => {
    if (key in IMAGE_COLOR_PROP_KEYS) {
      const typedKey = key as (typeof IMAGE_COLOR_PROP_KEYS)[number];
      const newValue = typeof styles[typedKey] === "string" ? styles[typedKey] : COLORS[styles[typedKey] as keyof typeof COLORS];
      newStyles[typedKey] = newValue;
    } else {
      // @ts-ignore
      newStyles[key] = styles[key];
    }
  });

  return newStyles;
}

export function createViewStyles(styles: CViewStyle): ViewStyle {
  const newStyles: ViewStyle = {};

  const objKeys = Object.keys(styles) as (keyof CViewStyle)[];

  objKeys.forEach((key) => {
    if (VIEW_COLOR_PROP_KEYS.includes(key as (typeof VIEW_COLOR_PROP_KEYS)[number])) {
      const typedKey = key as (typeof VIEW_COLOR_PROP_KEYS)[number];
      const newValue = typeof styles[typedKey] === "string" ? styles[typedKey] : COLORS[styles[typedKey] as keyof typeof COLORS];
      newStyles[typedKey] = newValue;
    } else {
      // @ts-ignore
      newStyles[key] = styles[key];
    }
  });

  return newStyles;
}
