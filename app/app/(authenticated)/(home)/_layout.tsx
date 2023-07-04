import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { defaultHeaderStyles } from "../_layout";

export default function HomeStack() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ ...defaultHeaderStyles }}>
      <Stack.Screen name="group/create" options={{ title: t("group.create.title", "Uusi ryhmä") }} />
      <Stack.Screen name="index" />
    </Stack>
  );
}
