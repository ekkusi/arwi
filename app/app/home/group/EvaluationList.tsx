import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import Animated, { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { isClassParticipationCollection } from "arwi-backend/src/types/typeGuards";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import CButton from "../../../components/primitives/CButton";
import { COLORS, SPACING } from "../../../theme";
import { GroupNavigationProps } from "./types";
import Card from "../../../components/Card";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import { formatDate } from "../../../helpers/dateHelpers";

export default function EvaluationList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & GroupNavigationProps) {
  const { t } = useTranslation();

  const { evaluationCollections } = group.currentModule;
  const classParticipationCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "ClassParticipationCollection">>(
      isClassParticipationCollection
    );
  const sortedCollections = classParticipationCollections.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const translateY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const newEvaluationButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        translateY.value = 0;
      } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value) {
        translateY.value = 100;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (_) => {
      isScrolling.value = true;
    },
    onEndDrag: (_) => {
      isScrolling.value = false;
    },
  });

  return (
    <CView style={{ flexGrow: 1, paddingHorizontal: "md" }}>
      {sortedCollections.length > 0 ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: SPACING.md }}
          data={sortedCollections}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: "md" }} key={item.id}>
              <CTouchableOpacity
                onPress={() =>
                  navigation.navigate("collection", {
                    id: item.id,
                    date: formatDate(item.date),
                    archived: group.archived,
                    environmentLabel: item.environment.label,
                  })
                }
              >
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{item.environment.label.fi}</CText>
                <CView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <CView style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: item.environment.color }} />
                  <CText style={{ fontSize: "sm", color: "gray" }}>{formatDate(item.date)}</CText>
                </CView>
              </CTouchableOpacity>
            </Card>
          )}
        />
      ) : (
        <CText style={{ paddingTop: 50, alignSelf: "center" }}>{t("group.no-collections", "Ryhmälle ei vielä olla tehty tuntiarviointeja")}</CText>
      )}
      {!group.archived && (
        <Animated.View style={[{ position: "absolute", bottom: 20, right: 15, backgroundColor: "rgba(0,0,0,0)" }, newEvaluationButtonStyle]}>
          <CButton
            shadowed
            title={t("new-class-evaluation", "Uusi tuntiarviointi")}
            onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
            leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
          />
        </Animated.View>
      )}
    </CView>
  );
}
