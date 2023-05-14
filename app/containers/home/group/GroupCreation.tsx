import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupCreation">;

export default function GroupCreation({ navigation, route }: GroupViewProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: FONT_SIZES.title, fontWeight: "600" }}>Täällä tehdään uusi ryhmÄ!</Text>
    </View>
  );
}
