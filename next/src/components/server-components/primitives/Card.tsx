import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

export type CardProps = BoxProps;

export default forwardRef((props: CardProps, ref) => {
  return <Box ref={ref} borderRadius="lg" boxShadow="md" bg="white" color="light-text" px="5" py="4" width="100%" {...props} />;
});
