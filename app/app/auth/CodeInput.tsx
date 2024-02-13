import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useMutation } from "@apollo/client";
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
  const [focused, setFocused] = useState(false);

  const [verifyPasswordResetCode, { loading }] = useMutation(CodeInput_VerifyPasswordResetCode_Mutation);

  const handleCodeChange = (newCode: string) => {
    const parsedCode = newCode.replace(/[^0-9]/g, "");
    setCode(parsedCode);
    if (parsedCode.length === CODE_LENGTH) {
      handleCheckCode(parsedCode);
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
        <CText style={{ marginBottom: "xl", fontSize: "md", fontWeight: "300" }}>
          {t("email-sent-to", "Koodi lähetetty sähköpostiin {{email}}. Syötä lähetetty koodi alle jatkaaksesi salasanan uusimiseen.", { email })}
        </CText>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "xl" }}>
          <TextFormField
            title=""
            value={code}
            placeholder="123456"
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            style={{
              width: "100%",
              borderWidth: 1,
              height: 60,
              borderColor: focused ? "gray" : "lightgray",
              borderRadius: 30,
              fontSize: 35,
              fontWeight: "200",
            }}
            keyboardType="number-pad"
            textAlign="center"
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleCodeChange}
          />
          {error && <CText style={{ color: "error", fontWeight: "600", fontSize: "sm" }}>{error}</CText>}
          <CButton
            variant="outline"
            colorScheme="darkgray"
            title={t("check-code", "Tarkista koodi")}
            loading={loading}
            onPress={() => handleCheckCode(code)}
          />
        </CView>
      </CView>
    </LandingComponent>
  );
}
