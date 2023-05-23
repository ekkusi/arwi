import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "./tokens";
import {
  CImageStyle,
  ColorKey,
  CSpacing,
  CTextStyle,
  CViewStyle,
  ImageColorPropKey,
  IMAGE_COLOR_PROP_KEYS,
  SpacingPropKey,
  SPACING_PROP_KEYS,
  TextColorPropKey,
  TEXT_COLOR_PROP_KEYS,
  ViewColorPropKey,
  VIEW_COLOR_PROP_KEYS,
} from "./types";

const getSpacingValue = (value: CSpacing): number => {
  return typeof value === "number" ? value : SPACING[value as keyof typeof SPACING];
};

const getColor = (colorKey: string): string | undefined => {
  return COLORS[colorKey as ColorKey] || undefined;
};

export function createTextStyles(styles: CTextStyle): TextStyle {
  const newStyles: TextStyle = {};

  const objKeys = Object.keys(styles) as (keyof CTextStyle)[];

  objKeys.forEach((key) => {
    if (key === "fontSize") {
      const newValue = typeof styles[key] === "number" ? (styles[key] as number) : FONT_SIZES[styles[key] as keyof typeof FONT_SIZES];
      newStyles[key] = newValue;
    } else if (TEXT_COLOR_PROP_KEYS.includes(key as TextColorPropKey)) {
      const typedKey = key as TextColorPropKey;
      const newValue = getColor(styles[typedKey] as string) || styles[typedKey];
      newStyles[typedKey] = newValue;
    } else if (SPACING_PROP_KEYS.includes(key as SpacingPropKey)) {
      const typedKey = key as SpacingPropKey;
      const newValue = getSpacingValue(styles[typedKey] as CSpacing);
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
    if (IMAGE_COLOR_PROP_KEYS.includes(key as ImageColorPropKey)) {
      const typedKey = key as ImageColorPropKey;
      const newValue = getColor(styles[typedKey] as string) || styles[typedKey];
      newStyles[typedKey] = newValue;
    } else if (SPACING_PROP_KEYS.includes(key as SpacingPropKey)) {
      const typedKey = key as SpacingPropKey;
      const newValue = getSpacingValue(styles[typedKey] as CSpacing);
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
    if (VIEW_COLOR_PROP_KEYS.includes(key as ViewColorPropKey)) {
      const typedKey = key as ViewColorPropKey;
      const newValue = getColor(styles[typedKey] as string) || styles[typedKey];
      newStyles[typedKey] = newValue;
    } else if (SPACING_PROP_KEYS.includes(key as SpacingPropKey)) {
      const typedKey = key as SpacingPropKey;
      const newValue = getSpacingValue(styles[typedKey] as CSpacing);
      newStyles[typedKey] = newValue;
    } else {
      // @ts-ignore
      newStyles[key] = styles[key];
    }
  });

  return newStyles;
}
