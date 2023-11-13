import { useMemo } from "react";
import { Image, ImageProps } from "react-native";
import { CImageStyle } from "../../theme/types";
import { createImageStyles } from "../../theme/utils";

export type CImageProps = Omit<ImageProps, "style" | "tint"> & {
  style?: CImageStyle;
  imageStyle?: CImageStyle;
} & (
    | {
        variant?: "fill";
        width?: never;
        height?: never;
      }
    | {
        variant: "fixed";
        width: number;
        height: number;
      }
  );

const DEFAULT_IMAGE_STYLES: CImageStyle = {
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: "contain",
};

const FIXED_IMAGE_STYLES: CImageStyle = {};

export default function CImage({ style, width, height, variant = "fill", ...rest }: CImageProps) {
  const imageStyles = useMemo(
    () => createImageStyles({ ...(variant === "fill" ? DEFAULT_IMAGE_STYLES : { width, height }), ...style }),
    [height, style, variant, width]
  );

  return <Image style={imageStyles} {...rest} />;
}
