import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES } from "./config";
import { COLOR_PROP_KEYS, CStyles, IMAGE_COLOR_PROP_KEYS, TEXT_COLOR_PROP_KEYS, VIEW_COLOR_PROP_KEYS } from "./types";

export function createTextStyles(styles: CStyles<TextStyle>): TextStyle {
  const newStyles: TextStyle = {};

  const objKeys = Object.keys(styles) as (keyof CStyles<TextStyle>)[];
  console.log(styles, "og styles");

  objKeys.forEach((key) => {
    console.log("setting key", key);

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

export function createImageStyles(styles: CStyles<ImageStyle>): ImageStyle {
  const newStyles: ImageStyle = {};

  const objKeys = Object.keys(styles) as (keyof CStyles<ImageStyle>)[];

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

export function createViewStyles(styles: CStyles<ViewStyle>): ViewStyle {
  const newStyles: ViewStyle = {};

  const objKeys = Object.keys(styles) as (keyof CStyles<ViewStyle>)[];

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

// export function createStyles<T extends TextStyle | ViewStyle | ImageStyle>(styles: CStyles<T>): T {
//   const newStyles: any = {};

//   Object.keys(styles).forEach((key) => {
//     switch (key) {
//       case "fontSize":
//         newStyles[key] = typeof styles[key] === "number" ? styles[key] : FONT_SIZES[styles[key]];
//         break;
//       case COLOR_PROP_KEYS:

//       default:
//         newStyles[key] = styles[key];
//         break;
//     }
//   });

//   return newStyles as T;
// }
