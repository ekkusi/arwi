import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import Layout from "../../../components/Layout";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { HomeStackParams } from "../types";

export default function LearningObjective({ route }: NativeStackScreenProps<HomeStackParams, "learning-objective">) {
  const { code, label, description } = route.params;
  const { t } = useTranslation();
  return (
    <Layout style={{ gap: 30, padding: "lg", backgroundColor: "white" }}>
      <CText>
        <CText style={{ fontSize: "title", fontWeight: "600" }}>{code}: </CText>
        <CText style={{ fontSize: "title", fontWeight: "400" }}>{label.fi}</CText>
      </CText>
      <CView style={{ gap: 8 }}>
        <CText style={{ fontSize: "lg", fontWeight: "400" }}>{t("learning-objective", "Oppimistavoite:")}</CText>
        <CText style={{ fontSize: "md", fontWeight: "300" }}>{description.fi}.</CText>
      </CView>
    </Layout>
  );
}
