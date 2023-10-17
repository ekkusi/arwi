import { useMemo } from "react";
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";
import CView from "./CView";

type CTouchableWithoutFeedbackProps = Omit<TouchableWithoutFeedbackProps, "style"> & {
  style?: CViewStyle;
  outerStyles?: CViewStyle;
};

// Component to wrap TouchableWithoutFeedback andCView together as they TouchableWithoutFeedback has to always have a View as a direct child.
export default function CTouchableWithoutFeedback({ style, outerStyles, children, ...rest }: CTouchableWithoutFeedbackProps) {
  const styles = useMemo(() => outerStyles && createViewStyles(outerStyles), [outerStyles]);

  return (
    <TouchableWithoutFeedback style={styles} {...rest}>
      <CView style={style}>{children}</CView>
    </TouchableWithoutFeedback>
  );
}
