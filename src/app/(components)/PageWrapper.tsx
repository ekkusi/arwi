import { Box } from "@/components/chakra";
import { BoxProps } from "@chakra-ui/react";

type PageWrapperProps = BoxProps;

function PageWrapper({ children, ...rest }: PageWrapperProps) {
  return (
    <Box
      as="main"
      p="5"
      bg="light-gray"
      minHeight="100vh"
      width="100%"
      {...rest}
    >
      {children}
    </Box>
  );
}

export default PageWrapper;
