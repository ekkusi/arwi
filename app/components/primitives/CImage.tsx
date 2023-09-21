import { useMemo } from "react";
import { Image, ImageProps } from "react-native";
import { CImageStyle } from "../../theme/types";
import { createImageStyles } from "../../theme/utils";

export type CImageProps = Omit<ImageProps, "style"> & {
  style?: CImageStyle;
};

const DEFAULT_IMAGE_STYLES: CImageStyle = {
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: "contain",
};

export default function CImage({ style, ...rest }: CImageProps) {
  const styles = useMemo(() => createImageStyles({ ...DEFAULT_IMAGE_STYLES, ...style }), [style]);

  return <Image style={styles} {...rest} />;
}
