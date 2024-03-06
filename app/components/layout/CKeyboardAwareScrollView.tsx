import { forwardRef, useMemo } from "react";
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from "react-native-keyboard-aware-scroll-view";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";
import CKeyboardAvoidingView, { CKeyboardAvoidingViewProps } from "./CKeyboardAvoidingView";
import CView from "../primitives/CView";

export type CKeyboardAwareScrollViewProps = Omit<KeyboardAwareScrollViewProps, "style" | "contentContainerStyle" | "enableOnAndroid"> & {
  style?: CViewStyle;
  contentContainerStyle?: CViewStyle;
  androidKeyboardAvoidProps?: Omit<CKeyboardAvoidingViewProps, "behavior">;
  closeKeyboardOnTap?: boolean;
};

function CKeyboardAwareScrollViewNoRef(
  {
    style,
    contentContainerStyle,
    extraScrollHeight,
    children,
    keyboardShouldPersistTaps = "handled",
    closeKeyboardOnTap = true,
    ...rest
  }: CKeyboardAwareScrollViewProps,
  ref: React.ForwardedRef<KeyboardAwareScrollView>
) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);
  const contentContainerStyles = useMemo(() => contentContainerStyle && createViewStyles(contentContainerStyle), [contentContainerStyle]);

  return (
    // KeyboardAwareScrollView does not work on Android => wrap with CKeyboardAvoidingView to provide same functionality
    <CKeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : undefined}
      keyboardVerticalOffset={extraScrollHeight}
      onStartShouldSetResponder={() => true}
      {...rest.androidKeyboardAvoidProps}
    >
      <KeyboardAwareScrollView
        ref={ref}
        style={styles}
        contentContainerStyle={contentContainerStyles}
        enableOnAndroid={false}
        extraScrollHeight={extraScrollHeight}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        {...rest}
      >
        {/* Prevent scroll touch being stopped by parent touchables */}
        <TouchableWithoutFeedback onPress={closeKeyboardOnTap ? () => Keyboard.dismiss() : undefined}>
          <CView>{children}</CView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </CKeyboardAvoidingView>
  );
}

const CKeyboardAwareScrollView = forwardRef(CKeyboardAwareScrollViewNoRef) as (
  props: CKeyboardAwareScrollViewProps & { ref?: React.ForwardedRef<KeyboardAwareScrollView> }
) => ReturnType<typeof CKeyboardAwareScrollViewNoRef>;

export default CKeyboardAwareScrollView;
