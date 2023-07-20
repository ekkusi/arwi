import React, { useMemo } from "react";
import { CTextStyle } from "../../theme/types";
import { createStyles } from "../../theme/utils";
import CText from "../primitives/CText";
import CView, { CViewProps } from "../primitives/CView";

export type FormFieldProps = CViewProps & {
  title?: string;
  titleStyle?: CTextStyle;
  error?: string;
  errorTextStyle?: CTextStyle;
};

export default function FormField(props: FormFieldProps) {
  const { error, errorTextStyle, title, children, titleStyle, style } = props;
  const textStyles: CTextStyle = useMemo(
    () => ({
      ...styles.titleStyle,
      ...(error ? styles.titleErrorStyle : {}),
      ...titleStyle,
    }),
    [error, titleStyle]
  );
  const errorStyles: CTextStyle = useMemo(
    () => ({
      color: "error",
      fontWeight: "600",
      fontSize: "sm",
      ...errorTextStyle,
    }),
    [errorTextStyle]
  );
  return (
    <CView style={{ width: "100%", ...style }}>
      {title && <CText style={textStyles}>{title}</CText>}
      {children}
      {error && <CText style={errorStyles}>{error}</CText>}
    </CView>
  );
}

const styles = createStyles({
  titleStyle: {
    fontWeight: "700",
    color: "darkgray",
  },
  titleErrorStyle: {
    color: "error",
  },
});
