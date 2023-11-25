import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LandingComponent from "./LandingComponent";
import CView from "../../components/primitives/CView";
import TextFormField from "../../components/form/TextFormField";
import { AuthStackParams } from "./types";

const CODE_LENGTH = 5;

export default function CodeInput({ navigation, route }: NativeStackScreenProps<AuthStackParams, "codeInput">) {
  const { email } = route.params;

  const handleCodeChange = (code: string) => {
    if (code.length === CODE_LENGTH) {
      navigation.navigate("updatePassword", { email, code });
    }
  };

  const { t } = useTranslation();
  return (
    <LandingComponent title={t("input-code", "Syötä koodi")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("code", "Koodi")}
            placeholder=""
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleCodeChange}
          />
        </CView>
      </CView>
    </LandingComponent>
  );
}
