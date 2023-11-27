import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { forwardRef, useState } from "react";
import { TextInput } from "react-native";
import CTouchableOpacity from "../primitives/CTouchableOpacity";
import CView, { CViewProps } from "../primitives/CView";
import { COLORS } from "../../theme";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";

export type SecretInputProps = CTextInputProps & {
  containerProps?: CViewProps;
};

export default forwardRef<TextInput, SecretInputProps>((props, ref) => {
  const { containerProps, ...rest } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return (
    <CView {...containerProps}>
      <CTextInput ref={ref} secureTextEntry={secureTextEntry} {...rest} />
      <CTouchableOpacity
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        style={{ position: "absolute", top: 5, right: "md", bottom: 0, justifyContent: "center", alignItems: "center" }}
      >
        <MaterialCommunityIcon name={secureTextEntry ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
      </CTouchableOpacity>
    </CView>
  );
});
