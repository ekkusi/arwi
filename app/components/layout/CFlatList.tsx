import { forwardRef, useMemo } from "react";
import { FlatList, FlatListProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CFlatListProps<ItemT> = Omit<FlatListProps<ItemT>, "style"> & {
  style?: CViewStyle;
};

function CFlatListNoRef<ItemT>({ style, ...rest }: CFlatListProps<ItemT>, ref: React.ForwardedRef<FlatList<ItemT>>) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <FlatList ref={ref} style={styles} {...rest} />;
}

const CFlatList = forwardRef(CFlatListNoRef) as <T>(
  props: CFlatListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => ReturnType<typeof CFlatListNoRef>;

export default CFlatList;
