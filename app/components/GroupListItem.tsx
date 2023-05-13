import { View, ViewProps, Text, TouchableOpacity } from "react-native";
import { Group } from "../mikanlelutyypit";
import { COLORS, FONT_SIZES } from "../theme";
import Card from "./Card";

export type CardProps = ViewProps;

const getColorForId = (id: string) => {
  switch (id) {
    case "sport":
      return COLORS.sport;
    case "language":
      return COLORS.language;
    case "art":
      return COLORS.art;
    case "class":
      return COLORS.class;
    default:
      return COLORS.white;
  }
};

type GroupListItemProps = {
  group: Group;
  onListItemPress: () => void;
};
export default function GroupListItem({ group, onListItemPress }: GroupListItemProps) {
  return (
    <Card>
      <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", height: 80 }} onPress={onListItemPress}>
        <Text style={{ fontSize: FONT_SIZES.medium, fontWeight: "600", color: COLORS.darkgray, flex: 1 }}>{group.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: getColorForId(group.type) }} />
          <Text style={{ fontSize: FONT_SIZES.small, color: COLORS.lightgray }}>{group.type}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
