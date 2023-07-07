import { useMemo } from "react";
import { FlatList, FlatListProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CFlatListProps<ItemT> = Omit<FlatListProps<ItemT>, "style"> & {
  style?: CViewStyle;
};

export default function CFlatList<ItemT>({ style, ...rest }: CFlatListProps<ItemT>) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <FlatList style={styles} {...rest} />;
}
