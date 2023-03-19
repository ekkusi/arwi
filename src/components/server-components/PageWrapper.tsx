import { Box, BoxProps } from "@chakra-ui/react";

type PageWrapperProps = BoxProps;

function PageWrapper(props: PageWrapperProps) {
  return (
    <Box
      as="main"
      p="5"
      bg="light-gray"
      minHeight="100vh"
      width="100%"
      position="relative"
      pb="calc(58px + var(--chakra-space-5))"
      {...props}
    />
  );
}

export default PageWrapper;
