import { Flex, FlexProps } from "@chakra-ui/react";
import BackwardsLink from "../general/BackwardsLink";

type TopNavigationBarProps = FlexProps & {};

export default function TopNavigationBar({ children, ...rest }: TopNavigationBarProps) {
  return (
    <Flex justifyContent="space-between" {...rest}>
      <BackwardsLink />
      {children}
    </Flex>
  );
}
