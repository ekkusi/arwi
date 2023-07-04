import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import { defaultHeaderStyles } from "./_layout";

export default function DesignView() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          title: t("design.title", "Tyylit"),
          headerShown: true,
          ...defaultHeaderStyles,
        }}
      />
      <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CText>Tyylit</CText>
      </CView>
    </>
  );
}
