import { forwardRef, useMemo } from "react";
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from "react-native-keyboard-aware-scroll-view";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CKeyboardAwareScrollViewProps = Omit<KeyboardAwareScrollViewProps, "style" | "contentContainerStyle"> & {
  style?: CViewStyle;
  contentContainerStyle?: CViewStyle;
};

function CKeyboardAwareScrollViewNoRef(
  { style, contentContainerStyle, ...rest }: CKeyboardAwareScrollViewProps,
  ref: React.ForwardedRef<KeyboardAwareScrollView>
) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);
  const contentContainerStyles = useMemo(() => contentContainerStyle && createViewStyles(contentContainerStyle), [contentContainerStyle]);

  return <KeyboardAwareScrollView ref={ref} style={styles} contentContainerStyle={contentContainerStyles} {...rest} />;
}

const CKeyboardAwareScrollView = forwardRef(CKeyboardAwareScrollViewNoRef) as (
  props: CKeyboardAwareScrollViewProps & { ref?: React.ForwardedRef<KeyboardAwareScrollView> }
) => ReturnType<typeof CKeyboardAwareScrollViewNoRef>;

export default CKeyboardAwareScrollView;
