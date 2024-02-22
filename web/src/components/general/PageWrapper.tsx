import { Flex, BoxProps, Box } from "@chakra-ui/react";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";

export type PageWrapperProps = BoxProps & {
  footerProps?: FooterProps;
  headerProps?: HeaderProps;
  outerProps?: BoxProps;
};

export default function PageWrapper({ children, footerProps, headerProps, outerProps, ...rest }: PageWrapperProps) {
  const layoutProps = {};
  return (
    <Flex flexDirection="column" bg="light-gray" minHeight="100vh" width="100%" position="relative" {...outerProps}>
      <Header {...headerProps} />
      <Box as="main" flex={1} px="4" width="100%" {...layoutProps} {...rest}>
        {children}
      </Box>
      <Footer {...footerProps} />
    </Flex>
  );
}
