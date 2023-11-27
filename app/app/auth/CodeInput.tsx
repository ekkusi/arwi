import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { useFocusEffect } from "@react-navigation/native";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import TextFormField from "../../components/form/TextFormField";
import { AuthStackParams } from "./types";
import CText from "../../components/primitives/CText";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";

const CODE_LENGTH = 6;

const CodeInput_VerifyPasswordResetCode_Mutation = graphql(`
  mutation CodeInput_VerifyPasswordResetCode($code: String!) {
    verifyPasswordResetCode(code: $code)
  }
`);

export default function CodeInput({ navigation, route }: NativeStackScreenProps<AuthStackParams, "code-input">) {
  const { email } = route.params;
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [verifyPasswordResetCode, { loading }] = useMutation(CodeInput_VerifyPasswordResetCode_Mutation);

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (newCode.length === CODE_LENGTH) {
      handleCheckCode(newCode);
    }
  };

  const handleCheckCode = async (resetCode: string) => {
    try {
      await verifyPasswordResetCode({ variables: { code: resetCode } });
      navigation.navigate("update-password", { code: resetCode });
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  const { t } = useTranslation();

  return (
    <LandingComponent title={t("input-code", "Syötä koodi")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        <CText style={{ marginBottom: "xl" }}>
          {t("email-sent-to", "Koodi lähetetty sähköpostiin {{email}}. Syötä lähetetty koodi alle jatkaaksesi salasanan uusimiseen.", { email })}
        </CText>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("code", "Koodi")}
            placeholder="123456"
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleCodeChange}
          />
          {error && <CText style={{ color: "error", fontWeight: "600" }}>{error}</CText>}
          <CButton title={t("check-code", "Tarkista koodi")} loading={loading} onPress={() => handleCheckCode(code)} />
        </CView>
      </CView>
    </LandingComponent>
  );
}
