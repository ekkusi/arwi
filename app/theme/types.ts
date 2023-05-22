import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "./tokens";

export type CColor = keyof typeof COLORS | (string & Record<never, never>);
export type CFontSize = keyof typeof FONT_SIZES | (number & Record<never, never>);
export type CSpacing = keyof typeof SPACING | number;

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

export type CSpacingProps = {
  [key in (typeof SPACING_PROP_KEYS)[number]]?: CSpacing;
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

export const TEXT_COLOR_PROP_KEYS = ["color", "textDecorationColor", "textShadowColor", ...VIEW_COLOR_PROP_KEYS] as const;

export const IMAGE_COLOR_PROP_KEYS = ["backgroundColor", "borderColor", "tintColor", "overlayColor"] as const;

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

// export type CTextStyle = Omit<TextStyle, keyof CTextStyleProps | keyof CSpacingProps> &
//   CSpacingProps &
//   Pick<CTextStyleProps, keyof TextStyle & keyof CTextStyleProps>;
// export type CViewStyle = Omit<ViewStyle, keyof CViewStyleProps | keyof CSpacing> &
//   CSpacing &
//   Pick<CViewStyleProps, keyof ViewStyle & keyof CViewStyleProps>;
export type CViewStyle = Override<ViewStyle, CViewStyleProps & CSpacingProps>;
// export type CImageStyle = Omit<ImageStyle, keyof CImageStyleProps | keyof CSpacing> &
//   CSpacing &
//   Pick<CImageStyleProps, keyof ImageStyle & keyof CImageStyleProps>;
export type CImageStyle = Override<ImageStyle, CImageStyleProps & CSpacingProps>;
// export type CStyles = Omit<TextStyle, keyof CStyleProps> & Pick<CStyleProps, keyof TextStyle & keyof CStyleProps>;
