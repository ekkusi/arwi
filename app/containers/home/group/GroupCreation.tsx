import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Card from "../../../components/Card";
import CustomTextInput from "../../../components/CustomTextInput";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

const nameValidator = (name: string) => {
  if (name.length <= 0) {
    return "Nimi ei saa olla tyhjä";
  }
  return undefined;
};

export default function GroupCreation({ navigation, route }: GroupViewProps) {
  return (
    <View style={{ flex: 1, margin: 15 }}>
      <CustomTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
    </View>
  );
}
