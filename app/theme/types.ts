import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "./tokens";

export type ColorKey = keyof typeof COLORS;
export type FontKey = keyof typeof FONT_SIZES;
export type SpacingKey = keyof typeof SPACING;

export type CColor = ColorKey | (string & Record<never, never>);
export type CFontSize = FontKey | (number & Record<never, never>);
export type CSpacing = SpacingKey | number;

export const SPACING_PROP_KEYS = [
  "bottom",
  "left",
  "right",
  "start",
  "end",
  "top",
  "gap",
  "rowGap",
  "columnGap",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginStart",
  "marginEnd",
  "marginTop",
  "marginVertical",
  "marginHorizontal",
  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingStart",
  "paddingEnd",
  "paddingTop",
  "paddingVertical",
  "paddingHorizontal",
] as const;

export type SpacingPropKey = (typeof SPACING_PROP_KEYS)[number];

export type CSpacingProps = {
  [key in SpacingPropKey]?: CSpacing;
};

export const VIEW_COLOR_PROP_KEYS = [
  "backgroundColor",
  "borderColor",
  "borderBottomColor",
  "borderTopColor",
  "borderLeftColor",
  "borderRightColor",
  "borderStartColor",
  "borderEndColor",
] as const;
export type ViewColorPropKey = (typeof VIEW_COLOR_PROP_KEYS)[number];

export const TEXT_COLOR_PROP_KEYS = ["color", "textDecorationColor", "textShadowColor", ...VIEW_COLOR_PROP_KEYS] as const;
export type TextColorPropKey = (typeof TEXT_COLOR_PROP_KEYS)[number];

export const IMAGE_COLOR_PROP_KEYS = ["backgroundColor", "borderColor", "tintColor", "overlayColor"] as const;
export type ImageColorPropKey = (typeof IMAGE_COLOR_PROP_KEYS)[number];

export type CTextColorProps = {
  [key in (typeof TEXT_COLOR_PROP_KEYS)[number]]?: CColor;
};

export type CViewColorProps = {
  [key in (typeof VIEW_COLOR_PROP_KEYS)[number]]?: CColor;
};

export type CImageColorProps = {
  [key in (typeof IMAGE_COLOR_PROP_KEYS)[number]]?: CColor;
};

type CTextStyleProps = CTextColorProps & {
  fontSize?: CFontSize;
};

type CViewStyleProps = CViewColorProps;

type CImageStyleProps = CImageColorProps;

export type CTextStyle = Override<TextStyle, CTextStyleProps & CSpacingProps>;
export type CViewStyle = Override<ViewStyle, CViewStyleProps & CSpacingProps>;
export type CImageStyle = Override<ImageStyle, CImageStyleProps & CSpacingProps>;

export type CStyle = CTextStyle | CViewStyle | CImageStyle;

export type CStyles<T> = {
  [key in keyof T]: CStyle;
};
