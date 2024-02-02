import { Flex, BoxProps, Box } from "@chakra-ui/react";
import Image from "next/image";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";

export type PageWrapperProps = BoxProps & {
  footerProps?: FooterProps;
  headerProps?: HeaderProps;
  outerProps?: BoxProps;
  layout?: "default" | "full";
};

export default function BasePageWrapper({ children, footerProps, headerProps, outerProps, layout = "default", ...rest }: PageWrapperProps) {
  const layoutProps = layout === "default" ? { mx: "auto", maxWidth: { base: "100%", md: "750px", xl: "1000px" } } : {};
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
