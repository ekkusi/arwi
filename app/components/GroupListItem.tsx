import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { graphql } from "../gql";
import { GroupListItemFragment } from "../gql/graphql";
import { COLORS, FONT_SIZES } from "../theme";
import Card from "./Card";
import { timeSince } from "../helpers/dateHelpers";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CImage from "./primitives/CImage";
import { subjectToIcon } from "../helpers/dataMappers";

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
  onEvaluateIconPress: () => void;
};
export default function GroupListItem({ group, onListItemPress, onEvaluateIconPress }: GroupListItemProps) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CTouchableOpacity
        style={{ flex: 1, height: 50, gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        onPress={onListItemPress}
      >
        <CView style={{ flex: 6, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "flex-start" }}>
          <CView
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderColor: "lightgray",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CView style={{ width: 30, height: 30 }}>
              <CImage
                style={{
                  width: undefined,
                  height: undefined,
                  flex: 1,
                  resizeMode: "contain",
                  tintColor: "darkgray",
                }}
                source={subjectToIcon(group.subject)}
              />
            </CView>
          </CView>
          <CView style={{ flexGrow: 1, gap: 5 }}>
            <CView style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <CText style={{ fontSize: "lg", fontWeight: "700", color: "darkgray", flex: 1 }}>{group.name}</CText>
            </CView>
            <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
              <MaterialCommunityIcon name="history" color="gray" />
              <CText style={{ fontSize: "sm", color: "gray" }}>{timeSince(group.updatedAt)} ago</CText>
              <CView style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: getColorForCode(group.subject.code) }} />
            </CView>
          </CView>
        </CView>
        <CView style={{ flex: 1 }}>
          <CTouchableOpacity onPress={onEvaluateIconPress} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIcon name="pencil-plus-outline" color={COLORS.primary} size={25} />
          </CTouchableOpacity>
        </CView>
      </CTouchableOpacity>
    </Card>
  );
}
