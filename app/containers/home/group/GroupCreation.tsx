import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Card from "../../../components/Card";
import CustomSelectionInput from "../../../components/CustomSelectionInput";
import CustomTextInput from "../../../components/CustomTextInput";
import CView from "../../../components/primitives/CView";
import SelectionModal from "../../../components/SelectionModal";
import { nameValidator } from "../../../helpers/textValidation";
import { COLORS, FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

type Class = {
  name: string;
};

const classes: Class[] = [
  { name: "1. luokka" },
  { name: "2. luokka" },
  { name: "3. luokka" },
  { name: "4. luokka" },
  { name: "5. luokka" },
  { name: "6. luokka" },
  { name: "7. luokka" },
  { name: "8. luokka" },
  { name: "9. luokka" },
];
export default function GroupCreation({ navigation, route }: GroupViewProps) {
  return (
    <CView style={{ flex: 1 }}>
      <CView style={{ flex: 1, margin: 15, gap: 10 }}>
        <CustomTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
        <CustomSelectionInput title="Luokka-aste" options={classes.map((obj) => obj.name)} />
      </CView>
    </CView>
  );
}
