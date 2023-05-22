import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Card from "../../../components/Card";
import CTextInput from "../../../components/primitives/CTextInput";
import CView from "../../../components/primitives/CView";
import { nameValidator } from "../../../helpers/textValidation";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

export default function GroupCreation({ navigation, route }: GroupViewProps) {
  return (
    <CView style={{ flex: 1, margin: 15 }}>
      <CTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
    </CView>
  );
}
