import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import TextFormField from "../../components/form/TextFormField";
import { nameValidator } from "../../helpers/textValidation";
import CButton from "../../components/primitives/CButton";
import { AuthStackParams } from "./types";

export default function ForgotPassword({ navigation }: NativeStackScreenProps<AuthStackParams, "forgotPassword">) {
  const [email, setEmail] = useState("");
  const [generalError, setGeneralError] = useState<string | undefined>();

  const handleEmailChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setEmail(text);
  };

  const requestCode = () => {
    // Send code to email.
    navigation.navigate("codeInput", { email });
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
          <CButton style={{ width: "100%" }} title={t("request-code", "Lähetä koodi")} onPress={requestCode} />
        </CView>
      </CView>
    </LandingComponent>
  );
}
