import { useMemo } from "react";
import { Image, ImageProps } from "react-native";
import { CImageStyle } from "../../theme/types";
import { createImageStyles } from "../../theme/utils";

export type CImageProps = Omit<ImageProps, "style"> & {
  style?: CImageStyle;
};

export default function CImage({ style, ...rest }: CImageProps) {
  const styles = useMemo(() => style && createImageStyles(style), [style]);

  return <Image style={styles} {...rest} />;
}
