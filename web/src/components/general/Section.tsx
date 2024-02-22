import { Box, BoxProps } from "@chakra-ui/react";

type SectionProps = BoxProps & {
  isFullWidth?: boolean;
};

export default function Section({ isFullWidth = false, ...rest }: SectionProps) {
  return (
    <Box
      as="section"
      my="20"
      mx={isFullWidth ? rest.mx : "auto"}
      width={isFullWidth ? "100%" : { base: "100%", md: "750px", xl: "1000px" }}
      maxWidth="100%"
      {...rest}
    />
  );
}
