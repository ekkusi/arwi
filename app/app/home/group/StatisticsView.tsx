import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironmentsByLevel, getEvaluableLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import React, { useMemo } from "react";
import Animated, { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { isClassParticipationCollection } from "arwi-backend/src/types/typeGuards";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import { getPredefinedColors, subjectToIcon } from "../../../helpers/dataMappers";
import StyledBarChart, { StyledBarChartDataType } from "../../../components/charts/StyledBarChart";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import CImage from "../../../components/primitives/CImage";
import CollectionStatistics from "../../../components/charts/CollectionStatistics";
import CButton from "../../../components/primitives/CButton";
import { COLORS } from "../../../theme";
import { GroupNavigationProps } from "./types";
import { getEnvironmentTranslation } from "../../../helpers/translation";
import Card from "../../../components/Card";

export default function StatisticsView({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & GroupNavigationProps) {
  const { t } = useTranslation();

  const moduleInfo = group.currentModule.info;
  // const environments = getEnvironmentsByLevel(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);

  const objectives = getEvaluableLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const colorPalette = getPredefinedColors(objectives.length);
  const { evaluationCollections } = group.currentModule;
  const classParticipationCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "ClassParticipationCollection">>(
      isClassParticipationCollection
    );

  const environmentsAndCounts: StyledBarChartDataType[] = useMemo(() => {
    const environments = getEnvironmentsByLevel(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);

    return environments.map((environment) => {
      return {
        x: environment.label.fi,
        color: environment.color,
        y: classParticipationCollections.reduce((val, evaluation) => (evaluation.environment.code === environment.code ? val + 1 : val), 0),
      };
    });
  }, [classParticipationCollections, group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey]);

  const learningObjectivesAndCounts: StyledBarChartDataType[] = useMemo(
    () =>
      objectives.map((objective, idx) => {
        return {
          x: `${objective.code}: ${objective.label.fi}`,
          color: colorPalette[idx],
          y: classParticipationCollections.reduce(
            (val, evaluation) => (evaluation.learningObjectives.map((obj) => obj.code).includes(objective.code) ? val + 1 : val),
            0
          ),
        };
      }),
    [objectives, colorPalette, classParticipationCollections]
  );

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
    <CView style={{ flexGrow: 1, backgroundColor: "white", paddingHorizontal: "lg" }}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2xl" }}>
          <CView>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{group.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.currentModule.info.label.fi}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.subject.label.fi}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.student-count", { count: group.currentModule.students.length })}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {t("group.evaluation-count", { count: group.currentModule.evaluationCollections.length })}
            </CText>
          </CView>
          <CView style={{ gap: 10, alignItems: "center", justifyContent: "center" }}>
            {group.archived && (
              <CView
                style={{
                  paddingHorizontal: 20,
                  height: 36,
                  borderRadius: 18,
                  borderColor: "lightgray",
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CText style={{ fontWeight: "500" }}>{t("archived", "Arkistoitu").toLocaleUpperCase()}</CText>
              </CView>
            )}
            <CView
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderColor: "lightgray",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CView style={{ width: 45, height: 45 }}>
                <CImage
                  style={{
                    tintColor: "darkgray",
                  }}
                  source={subjectToIcon(group.subject)}
                />
              </CView>
            </CView>
          </CView>
        </CView>
        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-types", "Arviointikohteet")}</CText>
          <CView style={{ gap: 5 }}>
            <Card
              style={{
                borderColor: "primary",
                borderWidth: 1,
              }}
            >
              <CView>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>Tuntityöskentely</CText>
                <CText style={{ fontSize: "sm", fontWeight: "300" }}>Jatkuvasti arvioitava</CText>
              </CView>
            </Card>
            <Card
              style={{
                borderColor: "primary",
                borderWidth: 1,
              }}
            >
              <CView>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>Geometrian koe</CText>
                <CText style={{ fontSize: "sm", fontWeight: "300" }}>Koe, kerran arvioitava</CText>
              </CView>
            </Card>
          </CView>
        </CView>

        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{getEnvironmentTranslation(t, "environments", group.subject.code)}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>
            {t("group.environment-counts", "Arviointikerrat {{by_environments_string}}", {
              by_environments_string: getEnvironmentTranslation(t, "by-environments", group.subject.code).toLocaleLowerCase(),
            })}
          </CText>
          <StyledBarChart data={environmentsAndCounts} style={{ height: 200 }} />
          <CView style={{ flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap", width: "100%", flex: 1 }}>
            {environmentsAndCounts.map((envAndCount, idx) => (
              <CView
                key={`${envAndCount.x}-${idx}`}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "50%",
                  paddingRight: "md",
                  marginBottom: "sm",
                }}
              >
                <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "sm", width: "80%" }}>
                  <CView style={{ width: 10, height: 10, backgroundColor: envAndCount.color }} />
                  <CText style={{ fontSize: "sm" }}>{envAndCount.x}</CText>
                </CView>
                <CText style={{ fontSize: "sm", fontWeight: "600", textAlign: "right" }}>{envAndCount.y}</CText>
              </CView>
            ))}
          </CView>
        </CView>
        <CollectionStatistics
          title={t("group.evaluation-means-title", "Arvioinnit")}
          subjectCode={group.subject.code}
          moduleInfo={group.currentModule.info}
          collections={classParticipationCollections}
        />
        {objectives.length > 0 && (
          <CView style={{ gap: 10 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("group.objectives", "Tavoitteet")}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.objective-counts", "Arviointikerrat tavoitteittain")}</CText>
            <StyledBarChart data={learningObjectivesAndCounts} style={{ height: 200 }} />
            <CView style={{ gap: 2, alignItems: "flex-start", width: "100%" }}>
              {learningObjectivesAndCounts.map((objAndCount, idx) => (
                <CView key={idx} style={{ justifyContent: "space-between", flexDirection: "row", width: "100%", paddingRight: 30 }}>
                  <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
                    <CView style={{ width: 10, height: 10, backgroundColor: objAndCount.color }} />
                    <CText style={{ fontSize: "xs" }}>{objAndCount.x}</CText>
                  </CView>
                  <CText style={{ fontSize: "sm", fontWeight: "600" }}>{objAndCount.y}</CText>
                </CView>
              ))}
            </CView>
          </CView>
        )}
      </Animated.ScrollView>
      {!group.archived && (
        <Animated.View style={[{ position: "absolute", bottom: 20, right: 15 }, newEvaluationButtonStyle]}>
          <CButton
            shadowed
            title={t("new-evaluation", "Uusi arviointi")}
            onPress={() =>
              navigation.navigate("collection-create", { groupId: group.id, collectionType: CollectionTypeCategory.CLASS_PARTICIPATION })
            }
            leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
          />
        </Animated.View>
      )}
    </CView>
  );
}
