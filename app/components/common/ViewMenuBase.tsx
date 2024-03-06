import React from "react";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CView, { CViewProps } from "../primitives/CView";

export type ViewMenuBaseProps = CViewProps;

export default function ViewMenuBase({ children, style, ...rest }: ViewMenuBaseProps) {
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4, ...style }} {...rest}>
          {children}
        </CView>
      </MenuOptions>
    </Menu>
  );
}
