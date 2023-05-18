import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import Card from "../../../components/Card";
import CustomTextInput from "../../../components/CustomTextInput";
import { nameValidator } from "../../../helpers/textValidation";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

export default function GroupCreation({ navigation, route }: GroupViewProps) {
  return (
    <View style={{ flex: 1, margin: 15 }}>
      <CustomTextInput placeholder="Ryhmän nimi" title="Ryhmän nimi" textValidation={nameValidator} />
    </View>
  );
}
