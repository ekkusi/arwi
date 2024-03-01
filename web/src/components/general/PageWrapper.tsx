import { Flex, BoxProps, Box } from "@chakra-ui/react";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../builder";

export type PageWrapperProps = BoxProps & {
  outerProps?: BoxProps;
};

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function PageWrapper({ children, outerProps, ...rest }: PageWrapperProps) {
  const symbolModelName = "symbol";
  const headerContent = await builder
    .get(symbolModelName, {
      query: { name: "Header" },
      staleCacheSeconds: process.env.NODE_ENV === "development" ? 0 : undefined,
    })
    .toPromise();

  const footerContent = await builder
    .get(symbolModelName, {
      query: { name: "Footer" },
      staleCacheSeconds: process.env.NODE_ENV === "development" ? 0 : undefined,
    })
    .toPromise();

  return (
    <Flex flexDirection="column" bg="light-gray" minHeight="100vh" width="100%" position="relative" {...outerProps}>
      <RenderBuilderContent content={headerContent} model={symbolModelName} redirectToNotFound={false} />
      <Box as="main" flex={1} width="100%" {...rest}>
        {children}
      </Box>
      <RenderBuilderContent content={footerContent} model={symbolModelName} redirectToNotFound={false} />
    </Flex>
  );
}
//
