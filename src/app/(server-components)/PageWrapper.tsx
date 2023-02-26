import { Box, NextLink } from "@/components/chakra";
import { BoxProps } from "@chakra-ui/react";

type PageWrapperProps = BoxProps & {
  hasNavigation?: boolean;
};

function PageWrapper({
  children,
  hasNavigation = true,
  ...rest
}: PageWrapperProps) {
  return (
    <Box
      as="main"
      p="5"
      bg="light-gray"
      minHeight="100vh"
      width="100%"
      position="relative"
      {...rest}
    >
      {hasNavigation && (
        <NextLink display="inline-block" mb="2" href="/">
          {"\u2B05 Takaisin pääsivulle"}
        </NextLink>
      )}
      {children}
    </Box>
  );
}

export default PageWrapper;
