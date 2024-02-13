import { Box, BoxProps } from "@chakra-ui/react";

type SectionProps = BoxProps;

export default function Section(props: SectionProps) {
  return <Box as="section" my="20" {...props} />;
}
