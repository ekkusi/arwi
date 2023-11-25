import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import TextFormField from "../../components/form/TextFormField";
import { AuthStackParams } from "./types";
import { nameValidator } from "../../helpers/textValidation";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { COLORS } from "../../theme";
import CText from "../../components/primitives/CText";
import CButton from "../../components/primitives/CButton";

const CODE_LENGTH = 5;

export default function UpdatePassword({ navigation, route }: NativeStackScreenProps<AuthStackParams, "updatePassword">) {
  const { email, code } = route.params;

  const [generalError, setGeneralError] = useState<string | undefined>();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [secureTextEntry3, setSecureTextEntry3] = useState(true);

  const { t } = useTranslation();
  return (
    <LandingComponent title={t("update-password", "Vaihda salasana")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <CView>
            <TextFormField
              title={t("old-password", "Salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              secureTextEntry={secureTextEntry1}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              validate={nameValidator}
              onChange={(text: string) => {
                setPassword(text);
              }}
            />
            <CTouchableOpacity
              onPress={() => setSecureTextEntry1(!secureTextEntry1)}
              style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
            >
              <MaterialCommunityIcon name={secureTextEntry1 ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
            </CTouchableOpacity>
          </CView>
          <CView>
            <TextFormField
              title={t("new-password", "Uusi salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              secureTextEntry={secureTextEntry2}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              validate={nameValidator}
              onChange={(text: string) => {
                setNewPassword(text);
              }}
            />
            <CTouchableOpacity
              onPress={() => setSecureTextEntry2(!secureTextEntry2)}
              style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
            >
              <MaterialCommunityIcon name={secureTextEntry2 ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
            </CTouchableOpacity>
          </CView>
          <CView>
            <TextFormField
              title={t("confirm-new-password", "Vahvista uusi salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              secureTextEntry={secureTextEntry3}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              validate={nameValidator}
              onChange={(text: string) => {
                setRepeatNewPassword(text);
              }}
            />
            <CTouchableOpacity
              onPress={() => setSecureTextEntry3(!secureTextEntry3)}
              style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
            >
              <MaterialCommunityIcon name={secureTextEntry3 ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
            </CTouchableOpacity>
          </CView>
          <CButton style={{ width: "100%" }} title={t("update-password", "Vaihda salasana")} />
        </CView>
      </CView>
    </LandingComponent>
  );
}
