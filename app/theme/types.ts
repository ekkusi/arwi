import { ColorValue, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES } from "./config";

export type CColor = keyof typeof COLORS | string | undefined;
export type Color = keyof typeof COLORS;
export type CFontSize = keyof typeof FONT_SIZES | number | undefined;

const some: { color: Color } = { color: "art" };

some.color = "white";

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

export const TEXT_COLOR_PROP_KEYS = ["color", "textDecorationColor", "textShadowColor", ...VIEW_COLOR_PROP_KEYS] as const;

export const IMAGE_COLOR_PROP_KEYS = ["backgroundColor", "borderColor", "tintColor", "overlayColor"] as const;

export const COLOR_PROP_KEYS = [
  "backgroundColor",
  "borderColor",
  "borderBottomColor",
  "borderTopColor",
  "borderLeftColor",
  "borderRightColor",
  "color",
  "textDecorationColor",
  "textShadowColor",
  "tintColor",
  "overlayColor",
  "shadowColor",
] as const;

export type CTextColorProps = {
  [key in (typeof TEXT_COLOR_PROP_KEYS)[number]]?: CColor;
};

export type CViewColorProps = {
  [key in (typeof VIEW_COLOR_PROP_KEYS)[number]]?: CColor;
};

export type CImageColorProps = {
  [key in (typeof IMAGE_COLOR_PROP_KEYS)[number]]?: CColor;
};

export type CTextStyleProps = CTextColorProps & {
  fontSize?: CFontSize;
};

export type CViewStyleProps = CViewColorProps;

export type CImageStyleProps = CImageColorProps;

export type CStyles<T extends TextStyle | ViewStyle | ImageStyle> = T extends TextStyle
  ? Omit<T, keyof CTextStyleProps> & Pick<CTextStyleProps, keyof T & keyof CTextStyleProps>
  : T extends ViewStyle
  ? Omit<T, keyof CViewStyleProps> & Pick<CViewStyleProps, keyof T & keyof CViewStyleProps>
  : T extends ImageStyle
  ? Omit<T, keyof CImageStyleProps> & Pick<CImageStyleProps, keyof T & keyof CImageStyleProps>
  : T;

export type CTextStyle = Omit<TextStyle, keyof CTextStyleProps> & Pick<CTextStyleProps, keyof TextStyle & keyof CTextStyleProps>;
export type CViewStyle = Omit<ViewStyle, keyof CViewStyleProps> & Pick<CViewStyleProps, keyof ViewStyle & keyof CViewStyleProps>;
export type CImageStyle = Omit<ImageStyle, keyof CImageStyleProps> & Pick<CImageStyleProps, keyof ImageStyle & keyof CImageStyleProps>;
// export type CStyles = Omit<TextStyle, keyof CStyleProps> & Pick<CStyleProps, keyof TextStyle & keyof CStyleProps>;
