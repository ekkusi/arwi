import { forwardRef, useMemo } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CScrollViewProps = Omit<ScrollViewProps, "style" | "contentContainerStyle"> & {
  style?: CViewStyle;
  contentContainerStyle?: CViewStyle;
};

function CScrollViewNoRef({ style, contentContainerStyle, ...rest }: CScrollViewProps, ref: React.ForwardedRef<ScrollView>) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);
  const contentContainerStyles = useMemo(() => contentContainerStyle && createViewStyles(contentContainerStyle), [contentContainerStyle]);

  return <ScrollView ref={ref} style={styles} contentContainerStyle={contentContainerStyles} {...rest} />;
}

const CScrollView = forwardRef(CScrollViewNoRef) as (
  props: CScrollViewProps & { ref?: React.ForwardedRef<ScrollView> }
) => ReturnType<typeof CScrollViewNoRef>;

export default CScrollView;
