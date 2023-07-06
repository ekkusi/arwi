import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { defaultHeaderStyles } from "../_layout";

export default function HomeStack() {
  // const { t } = useTranslation();
  return <Stack screenOptions={{ headerShown: true, ...defaultHeaderStyles }} />;
}
