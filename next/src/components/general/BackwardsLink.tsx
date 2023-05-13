import { Icon, Text, TextProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

type BackwardsLinkProps = TextProps & {
  prefetch?: boolean;
};

export default function BackwardsLink({ children, ...rest }: BackwardsLinkProps) {
  const router = useRouter();

  return (
    <Text as="a" onClick={() => router.back()} display="flex" alignItems="center" fontSize="lg" {...rest}>
      <Icon as={BiArrowBack} mr="1" w={6} h={6} />
      {children}
    </Text>
  );
}
