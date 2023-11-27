import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { useFocusEffect } from "@react-navigation/native";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import TextFormField from "../../components/form/TextFormField";
import { nameValidator } from "../../helpers/textValidation";
import CButton from "../../components/primitives/CButton";
import { AuthStackParams } from "./types";
import { graphql } from "../../gql";
import CText from "../../components/primitives/CText";

const ForgotPassword_RequestPasswordReset_Mutation = graphql(`
  mutation ForgotPassword_RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`);

export default function ForgotPassword({ navigation }: NativeStackScreenProps<AuthStackParams, "forgot-password">) {
  const [email, setEmail] = useState("");
  const [generalError, setGeneralError] = useState<string | undefined>();

  const [requestPasswordReset, { loading }] = useMutation(ForgotPassword_RequestPasswordReset_Mutation);

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const handleEmailChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setEmail(text);
  };

  const handleResetRequest = async () => {
    try {
      await requestPasswordReset({ variables: { email } });
    } catch (error) {
      setGeneralError(
        t(
          "error-in-password-reset",
          "Jotakin meni pieleen salasanan palautuksessa. Yritä uudelleen. Jos ongelma jatkuu, ota yhteyttä järjestelmänvalvojaan."
        )
      );
    }
    // Send code to email.
    navigation.navigate("code-input", { email });
  };

  const { t } = useTranslation();
  return (
    <LandingComponent title={t("password-reclaim", "Salasanan palautus")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("email", "Sähköposti")}
            placeholder="arwioija@gmail.com"
            validate={nameValidator}
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleEmailChange}
          />
          <CButton style={{ width: "100%" }} title={t("request-code", "Lähetä koodi")} onPress={handleResetRequest} loading={loading} />
          {generalError && <CText style={{ color: "error", fontWeight: "500", fontSize: "md" }}>{generalError}</CText>}
        </CView>
      </CView>
    </LandingComponent>
  );
}
