import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import { AuthStackParams } from "./types";
import CText from "../../components/primitives/CText";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import TextFormField from "../../components/form/TextFormField";
import { useToast } from "../../hooks-and-providers/ToastProvider";

const UpdatePasswordPage_UpdatePassword_Mutation = graphql(`
  mutation UpdatePasswordPage_UpdatePassword($code: String!, $newPassword: String!) {
    updatePassword(recoveryCode: $code, newPassword: $newPassword)
  }
`);

export default function UpdatePassword({ navigation, route }: NativeStackScreenProps<AuthStackParams, "update-password">) {
  const { code } = route.params;
  const { openToast } = useToast();

  const [updatePassword, { loading }] = useMutation(UpdatePasswordPage_UpdatePassword_Mutation);

  const [generalError, setGeneralError] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const handleUpdate = async () => {
    if (newPassword !== repeatNewPassword) {
      setGeneralError(t("passwords-dont-match", "Salasanat eivät täsmää"));
      return;
    }

    try {
      await updatePassword({ variables: { code, newPassword } });
      openToast(t("password-updated-succesfully", "Salasana vaihdettu onnistuneesti!"), { placement: "top" });
      navigation.navigate("login");
    } catch (e) {
      setGeneralError(e.message);
    }
  };

  const { t } = useTranslation();
  return (
    <LandingComponent title={t("update-password", "Vaihda salasana")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("new-password", "Uusi salasana")}
            placeholder={t("password", "Salasana")}
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={(text: string) => {
              setNewPassword(text);
            }}
            isSecret
          />
          <TextFormField
            title={t("confirm-new-password", "Vahvista uusi salasana")}
            placeholder={t("password", "Salasana")}
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={(text: string) => {
              setRepeatNewPassword(text);
            }}
            isSecret
          />
          {generalError && <CText style={{ color: "error", fontWeight: "600" }}>{generalError}</CText>}
          <CButton style={{ width: "100%" }} title={t("update-password", "Vaihda salasana")} onPress={handleUpdate} loading={loading} />
        </CView>
      </CView>
    </LandingComponent>
  );
}
