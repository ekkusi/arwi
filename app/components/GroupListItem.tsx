import { View, ViewProps, Text, TouchableOpacity } from "react-native";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { Group, GroupListItemFragment, Subject } from "../gql/graphql";
import { COLORS, FONT_SIZES } from "../theme";
import Card from "./Card";

export const GroupListItem_Fragment = graphql(`
  fragment GroupListItem on Group {
    id
    name
    subject {
      label
      code
    }
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
        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 50 }}
        onPress={onListItemPress}
      >
        <Text style={{ fontSize: FONT_SIZES.medium, fontWeight: "600", color: COLORS.darkgray, flex: 1 }}>{group.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1, gap: 10 }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: getColorForCode(group.subject.code) }} />
          <Text style={{ fontSize: FONT_SIZES.small, color: COLORS.lightgray }}>{group.subject.label}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
