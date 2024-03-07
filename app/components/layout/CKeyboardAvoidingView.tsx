import { useHeaderHeight } from "@react-navigation/elements";
import { useMemo } from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { KeyboardAvoidingViewProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CKeyboardAvoidingViewProps = Omit<KeyboardAvoidingViewProps, "style"> & {
  style?: CViewStyle;
};

export default function CKeyboardAvoidingView({ style, ...rest }: CKeyboardAvoidingViewProps) {
  const headerHeight = useHeaderHeight();

  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <KeyboardAvoidingView style={styles} behavior="padding" keyboardVerticalOffset={headerHeight + 15} {...rest} />;
}
