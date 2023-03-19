import { Box } from "@/components/chakra";
import { BoxProps, forwardRef } from "@chakra-ui/react";

export type BorderedCardProps = BoxProps;

export default forwardRef((props: BorderedCardProps, ref) => {
  return (
    <Box
      ref={ref}
      borderRadius="lg"
      border="2px"
      boxShadow="md"
      bg="white"
      color="light-text"
      p="4"
      {...props}
    />
  );
});
