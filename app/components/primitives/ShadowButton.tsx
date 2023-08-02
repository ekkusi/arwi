import React from "react";
import { CViewStyle } from "../../theme/types";
import { createStyles } from "../../theme/utils";
import CButton, { CButtonProps } from "./CButton";
import CView from "./CView";

// NOTE: THIS COMPONENT IS NOT FINISHED, does not work when set e.g. height to buttonStyle prop.

type ShadowButtonProps = CButtonProps & {
  buttonStyle?: CViewStyle;
};

export default function ShadowButton({ style, buttonStyle, ...rest }: ShadowButtonProps) {
  return (
    <CView style={{ ...styles.shadow, ...style }}>
      <CButton style={buttonStyle} {...rest} />
    </CView>
  );
}

const styles = createStyles({
  shadow: {
    alignSelf: "center",
    borderRadius: 28,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: "xs",
  },
});
