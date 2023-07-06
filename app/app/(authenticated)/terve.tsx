import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Stack, useRouter } from "expo-router";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";

export default function TerveView() {
  const { t } = useTranslation();
  console.log("HomeView (home)");

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CText style={{ fontSize: "largeTitle" }}>Koti</CText>
      </CView>
    </>
  );
}
