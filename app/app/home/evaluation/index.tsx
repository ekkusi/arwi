import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { HomeStackParams } from "../types";

export default function Evaluation({ navigation }: NativeStackScreenProps<HomeStackParams, "evaluation">) {
  return (
    <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, backgroundColor: "white" }}>
      <CText>Evaluation</CText>
    </CView>
  );
}
