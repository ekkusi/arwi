import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Redirect, Stack, useRouter } from "expo-router";
import CView from "../components/primitives/CView";
import CText from "../components/primitives/CText";
import { useAuth } from "../hooks-and-providers/AuthProvider";

export default function RootView() {
  console.log("HomeView (home)");
  const { authState } = useAuth();

  return authState.authenticated ? <Redirect href="/home" /> : <Redirect href="/auth/welcome" />;
}
