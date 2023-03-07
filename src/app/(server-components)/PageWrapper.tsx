import { Box } from "@/components/chakra";
import { BoxProps } from "@chakra-ui/react";

type PageWrapperProps = BoxProps & {
  hasNavigation?: boolean;
};

function PageWrapper({ children, ...rest }: PageWrapperProps) {
  return (
    <Box
      as="main"
      p="5"
      bg="light-gray"
      minHeight="100vh"
      width="100%"
      position="relative"
      pb="calc(58px + var(--chakra-space-5))"
      {...rest}
    >
      {/* {hasNavigation && (
        <LinkToHome display="inline-block" mb="2">
          {"\u2B05 Takaisin pääsivulle"}
        </LinkToHome>
      )} */}
      {children}
    </Box>
  );
}

export default PageWrapper;
