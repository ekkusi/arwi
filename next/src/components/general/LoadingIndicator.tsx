import { BoxProps, Spinner, SpinnerProps, Text, TextProps } from "@chakra-ui/react";
import CenteredContainer from "@/components/server-components/primitives/CenteredContainer";

type LoadingIndicatorProps = BoxProps & {
  textProps?: TextProps;
  spinnerProps?: SpinnerProps;
};

export default function LoadingIndicator({ textProps, spinnerProps, ...rest }: LoadingIndicatorProps) {
  return (
    <CenteredContainer display="flex" alignItems="center" justifyContent="center" color="green" {...rest}>
      <Text mr="2" {...textProps}>
        Loading
      </Text>
      <Spinner colorScheme="green" {...spinnerProps} />
    </CenteredContainer>
  );
}
