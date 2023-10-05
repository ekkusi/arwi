import { Box, BoxProps, useToken } from "@chakra-ui/react";
import { hexToRgbA } from "@/utils/color";

type OverlayProps = Omit<BoxProps, "bgColor" | "opacity"> & {
  bgColor: string;
  opacity?: number;
};

// Should have a position: relative in parent
export default function Overlay({ children, bgColor, opacity = 0.85, ...rest }: OverlayProps) {
  const bgHex = useToken("colors", bgColor);
  const bgRgba = hexToRgbA(bgHex, opacity);

  return (
    <Box position="absolute" top="0" left="0" right="0" bottom="0" bgColor={bgRgba} color="bg" {...rest}>
      {children}
    </Box>
  );
}
