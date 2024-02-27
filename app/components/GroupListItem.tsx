import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import { COLORS } from "../theme";
import Card, { CardProps } from "./Card";
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
    archived
    subject {
      label {
        fi
      }
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

type GroupListItemProps = CardProps & {
  group: FragmentOf<typeof GroupListItem_Fragment>;
  onListItemPress: () => void;
  onEvaluateIconPress: () => void;
};
export default function GroupListItem({ group: someGroup, onListItemPress, onEvaluateIconPress, ...rest }: GroupListItemProps) {
  const { t } = useTranslation();
  const group = readFragment(GroupListItem_Fragment, someGroup);

  const [{ count, key, updatedAt }, setTimeSince] = useState(() => ({ ...timeSince(group.updatedAt), updatedAt: group.updatedAt }));

  useEffect(() => {
    // Only calculate and set initial time since if the updatedAt has changed
    if (updatedAt !== group.updatedAt) {
      setTimeSince({ ...timeSince(group.updatedAt), updatedAt: group.updatedAt });
    }

    const interval = setInterval(() => {
      setTimeSince({ ...timeSince(group.updatedAt), updatedAt });
    }, 60 * 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [group.updatedAt, updatedAt]);

  return (
    <Card style={{ marginBottom: 10 }} {...rest}>
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
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", paddingRight: "lg" }}>
          {!group.archived && (
            <CTouchableOpacity onPress={onEvaluateIconPress} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcon name="pencil-plus-outline" color={COLORS.primary} size={25} />
            </CTouchableOpacity>
          )}
        </CView>
      </CTouchableOpacity>
    </Card>
  );
}
