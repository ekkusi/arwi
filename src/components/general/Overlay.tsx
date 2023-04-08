import { hexToRgbA } from "@/utils/color";
import { Box, BoxProps, useToken } from "@chakra-ui/react";

type OverlayProps = Omit<BoxProps, "bgColor"> & {
  bgColor: string;
};

// Should have a position: relative in parent
export default function Overlay({ children, bgColor, ...rest }: OverlayProps) {
  const bgHex = useToken("colors", bgColor);
  const bgRgba = hexToRgbA(bgHex, 0.85);

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgColor={bgRgba}
      color="bg"
      zIndex="101"
      {...rest}
    >
      {children}
    </Box>
  );
}
