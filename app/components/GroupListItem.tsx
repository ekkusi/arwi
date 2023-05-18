import { View, ViewProps, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { graphql } from "../gql";
import { Group, GroupListItemFragment, Subject } from "../gql/graphql";
import { COLORS, FONT_SIZES } from "../theme";
import Card from "./Card";
import { timeSince } from "../helpers/dateHelpers";

export const GroupListItem_Fragment = graphql(`
  fragment GroupListItem on Group {
    id
    name
    subject {
      label
      code
    }
    updatedAt
  }
`);

const getColorForCode = (code: string) => {
  switch (code) {
    case "LI":
      return COLORS.sport;
    case "BI":
      return COLORS.biology;
    case "PY":
      return COLORS.psychology;
    default:
      return COLORS.white;
  }
};

type GroupListItemProps = {
  group: GroupListItemFragment;
  onListItemPress: () => void;
};
export default function GroupListItem({ group, onListItemPress }: GroupListItemProps) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={{ flex: 1, height: 50, gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        onPress={onListItemPress}
      >
        <View style={{ gap: 5 }}>
          <View style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: FONT_SIZES.large, fontWeight: "700", color: COLORS.darkgray, flex: 1 }}>{group.name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
            <MaterialCommunityIcon name="history" color={COLORS.lightgray} />
            <Text style={{ fontSize: FONT_SIZES.small, color: COLORS.lightgray }}>{timeSince(group.updatedAt)} ago</Text>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: getColorForCode(group.subject.code) }} />
            <Text style={{ fontSize: FONT_SIZES.small, color: COLORS.lightgray }}>{group.subject.label}</Text>
          </View>
        </View>
        <Entypo name="dots-three-vertical" color={COLORS.darkgray} />
      </TouchableOpacity>
    </Card>
  );
}
