import { Box, BoxProps } from "@chakra-ui/react";

type CenteredContainerProps = BoxProps;

// NOTE: Parent needs to have position: relative
export default function CenteredContainer({
  children,
  ...rest
}: CenteredContainerProps) {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      {...rest}
    >
      {children}
    </Box>
  );
}
