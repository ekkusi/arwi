import { Box } from "@/components/chakra";
import { BoxProps } from "@chakra-ui/react";

type BorderedCardProps = BoxProps;

export default function BorderedCard(props: BorderedCardProps) {
  return (
    <Box
      borderRadius="lg"
      border="2px"
      boxShadow="md"
      bg="white"
      p="4"
      {...props}
    />
  );
}
