import { Box, BoxProps } from "@chakra-ui/react";

type PageWrapperProps = BoxProps;

function PageWrapper(props: PageWrapperProps) {
  return <Box as="main" p="5" bg="light-gray" minHeight="100vh" width="100%" position="relative" {...props} />;
}

export default PageWrapper;
