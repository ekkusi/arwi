import { useHeaderHeight } from "@react-navigation/elements";
import { useMemo } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

const BEHAVIOR = Platform.OS === "ios" ? "padding" : undefined;

export type CKeyboardAvoidingViewProps = Omit<KeyboardAvoidingViewProps, "style"> & {
  style?: CViewStyle;
};

export default function CKeyboardAvoidingView({ style, ...rest }: CKeyboardAvoidingViewProps) {
  const headerHeight = useHeaderHeight();

  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return (
    <KeyboardAvoidingView
      style={styles}
      behavior={BEHAVIOR}
      keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : headerHeight + 20}
      {...rest}
    />
  );
}
