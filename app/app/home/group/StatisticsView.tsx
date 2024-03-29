import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironmentsByLevel, getEvaluableLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import React, { useMemo } from "react";
import Animated, { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { isClassParticipationCollection, isDefaultCollection } from "arwi-backend/src/types/typeGuards";
import { subjectToIcon } from "../../../helpers/dataMappers";
import StyledBarChart, { StyledBarChartDataType } from "../../../components/charts/StyledBarChart";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import CImage from "../../../components/primitives/CImage";
import CollectionStatistics from "../../../components/charts/CollectionStatistics";
import CButton from "../../../components/primitives/CButton";
import { COLORS } from "../../../theme";
import { GroupOverviewProps } from "./types";
import { getEnvironmentTranslation } from "../../../helpers/translation";
import { useGenerateFeedback } from "../../../hooks-and-providers/GenerateFeedbacksProvider";
import LoadingIndicator from "../../../components/LoadingIndicator";
import EvaluationTargetCard from "./components/EvaluationTargetCard";

export default function StatisticsView({ getGroup: group, navigation }: GroupOverviewProps) {
  const { t } = useTranslation();
  const { isGenerating: isGeneratingFeedbacks } = useGenerateFeedback(group.id);

  const moduleInfo = group.currentModule.info;

  const objectives = getEvaluableLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);

  const { evaluationCollections } = group.currentModule;
  const classParticipationCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "ClassParticipationCollection">>(
      isClassParticipationCollection
    );
  const otherCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "DefaultCollection">>(isDefaultCollection);

  const classEvaluationType = group.currentModule.collectionTypes.find((type) => type.category === "CLASS_PARTICIPATION");
  const otherSelectedTypes = group.currentModule.collectionTypes.filter((type) => type.category !== "CLASS_PARTICIPATION");
  const otherSelectedTypeEvaluations = otherSelectedTypes.map((type) => {
    const evaluation = otherCollections.find((coll) => coll.type.id === type.id);
    return evaluation;
  });

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
      objectives.map((objective) => {
        return {
          x: `${objective.code}: ${objective.label.fi}`,
          color: objective.color,
          y: classParticipationCollections.reduce(
            (val, evaluation) => (evaluation.learningObjectives.map((obj) => obj.code).includes(objective.code) ? val + 1 : val),
            0
          ),
        };
      }),
    [objectives, classParticipationCollections]
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
        {isGeneratingFeedbacks && (
          <LoadingIndicator
            type="inline"
            color={COLORS.white}
            style={{
              paddingVertical: "md",
              gap: 5,
              flexDirection: "row",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CText style={{ color: "white" }}>{t("generating-final-feedback", "Loppupalautetta generoidaan...")}</CText>
          </LoadingIndicator>
        )}
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2xl" }}>
          <CView style={{ width: "70%" }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{group.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.currentModule.info.label.fi}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.subject.label.fi}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.student-count", { count: group.currentModule.students.length })}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {t("class-evaluation-count", "{{count}} tuntiarviointia", {
                count: group.currentModule.evaluationCollections.filter((ev) => ev.type.category === "CLASS_PARTICIPATION").length,
              })}
            </CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {t("class-evaluation-weight", "Tuntityöskentelyn painoarvo")}: {classEvaluationType?.weight}%
            </CText>
          </CView>
          <CView style={{ gap: 10, alignItems: "flex-end", justifyContent: "center", width: "30%" }}>
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
        {otherSelectedTypes.length > 0 && (
          <CView style={{ gap: 20 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-types", "Arvioitavat sisällöt")}</CText>
            <CView style={{ gap: 5 }}>
              {otherSelectedTypes.map((type, i) => {
                const evaluation = otherSelectedTypeEvaluations[i];
                return (
                  <EvaluationTargetCard
                    key={type.id}
                    navigation={navigation}
                    id={type.id}
                    collectionId={type.defaultTypeCollection?.id}
                    name={type.name}
                    archived={group.archived}
                    category={type.category}
                    groupId={group.id}
                    evaluated={!!evaluation}
                    weight={type.weight}
                  />
                );
              })}
            </CView>
          </CView>
        )}
        <CView style={{ gap: 20 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("final-feedback", "Loppuarviointi")}</CText>
          <CButton
            title={t("final-feedback-group", "Siirry loppuarviointiin")}
            onPress={() => {
              navigation.navigate("final-feedback-collection", { groupId: group.id });
            }}
          />
        </CView>
        <CView style={{ gap: 10 }}>
          <CView style={{ gap: 5 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("class-evaluations", "Tuntiarvioinnit")}</CText>
          </CView>
          <CText style={{ fontSize: "lg", fontWeight: "300" }}>
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
        <CollectionStatistics subjectCode={group.subject.code} moduleInfo={group.currentModule.info} collections={classParticipationCollections} />
        {objectives.length > 0 && (
          <CView style={{ gap: 10 }}>
            <CText style={{ fontSize: "lg", fontWeight: "300" }}>{t("group.objective-counts", "Arviointikerrat tavoitteittain")}</CText>
            <StyledBarChart data={learningObjectivesAndCounts} style={{ height: 200 }} />
            <CView style={{ gap: 2, alignItems: "flex-start", width: "100%" }}>
              {learningObjectivesAndCounts.map((objAndCount, idx) => (
                <CView key={idx} style={{ justifyContent: "space-between", width: "100%", flexDirection: "row", paddingRight: 20 }}>
                  <CView style={{ flexDirection: "row", flex: 0.9, justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
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
            title={t("new-class-evaluation", "Uusi tuntiarviointi")}
            onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
            leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
          />
        </Animated.View>
      )}
    </CView>
  );
}
