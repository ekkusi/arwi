import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { FONT_SIZES } from "../../../theme";
import { HomeStackParamList } from "../types";

type GroupViewProps = NativeStackScreenProps<HomeStackParamList, "GroupView">;

export default function GroupView({ route }: GroupViewProps) {
  const { group } = route.params;
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: FONT_SIZES.title, fontWeight: "600" }}>{group.name}</Text>
      <View style={{ width: "100%", aspectRatio: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: FONT_SIZES.medium }}>Kuvaajan näyttämiseen tarvitaan vähintään 3 arviointia</Text>
      </View>
    </View>
  );
}
