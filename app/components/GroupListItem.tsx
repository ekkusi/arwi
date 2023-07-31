import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
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

const translationDefaultForKey = (key: string) => {
  switch (key) {
    case "just-now":
      return "juuri äsken";
    case "minutes-ago":
      return "{{count}} minuuttia sitten";
    case "hours-ago":
      return "{{count}} tuntia sitten";
    case "days-ago":
      return "{{count}} päivää sitten";
    case "weeks-ago":
      return "{{count}} viikkoa sitten";
    case "months-ago":
      return "{{count}} kuukautta sitten";
    case "years-ago":
      return "{{count}} vuotta sitten";

    default:
      return "";
  }
};

type GroupListItemProps = {
  group: GroupListItemFragment;
  onListItemPress: () => void;
  onEvaluateIconPress: () => void;
};
export default function GroupListItem({ group, onListItemPress, onEvaluateIconPress }: GroupListItemProps) {
  const { t } = useTranslation();

  const { count: tempCount, key: tempKey } = timeSince(group.updatedAt);
  const [key, setKey] = useState(tempKey);
  const [count, setCount] = useState(tempCount);
  useEffect(() => {
    const interval = setInterval(() => {
      const { count: newCount, key: newKey } = timeSince(group.updatedAt);
      setKey(newKey);
      setCount(newCount);
    }, 60 * 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [group.updatedAt]);

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
            <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <CText style={{ fontWeight: "700", color: "darkgray", flex: 1 }}>{group.name}</CText>
            </CView>
            <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
              <MaterialCommunityIcon name="history" color="gray" />
              <CText style={{ fontSize: "sm", color: "gray" }}>
                {count ? t(key, translationDefaultForKey(key), { count }) : t(key, translationDefaultForKey(key))}
              </CText>
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
