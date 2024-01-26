import { Flex, BoxProps, Box } from "@chakra-ui/react";
import Image from "next/image";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";

type PageWrapperProps = BoxProps & {
  footerProps?: FooterProps;
  headerProps?: HeaderProps;
  outerProps?: BoxProps;
};

function PageWrapper({ children, footerProps, headerProps, outerProps, ...rest }: PageWrapperProps) {
  return (
    <Flex flexDirection="column" bg="light-gray" minHeight="100vh" width="100%" position="relative" {...outerProps}>
      <Header {...headerProps} />
      <Box as="main" flex={1} px="4" {...rest}>
        {children}
      </Box>
      <Footer {...footerProps} />
    </Flex>
  );
}

export default PageWrapper;
