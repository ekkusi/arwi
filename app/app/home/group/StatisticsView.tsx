import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironmentsByLevel, getEvaluableLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import React, { useMemo, useState } from "react";
import Animated, { Easing, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { isClassParticipationCollection, isDefaultCollection } from "arwi-backend/src/types/typeGuards";
import { ActivityIndicator } from "react-native";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import { subjectToIcon } from "../../../helpers/dataMappers";
import StyledBarChart, { StyledBarChartDataType } from "../../../components/charts/StyledBarChart";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import CImage from "../../../components/primitives/CImage";
import CollectionStatistics from "../../../components/charts/CollectionStatistics";
import CButton from "../../../components/primitives/CButton";
import { COLORS } from "../../../theme";
import { GroupNavigationProps } from "./types";
import { getCollectionTypeTranslation, getEnvironmentTranslation } from "../../../helpers/translation";
import Card from "../../../components/Card";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import { useModal } from "../../../hooks-and-providers/ModalProvider";
import { useToast } from "../../../hooks-and-providers/ToastProvider";
import { useGenerateFeedback } from "../../../hooks-and-providers/GenerateFeedbacksProvider";

const FEEDBACK_PROGRESS_HEIGHT = 50;

export default function StatisticsView({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & GroupNavigationProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { isGenerating: isGeneratingFeedbacks, generateFeedbacks } = useGenerateFeedback(group.id);
  const [finalFeedbackGenerated, setFinalFeedbackGenerated] = useState(false);
  const { openToast } = useToast();

  const moduleInfo = group.currentModule.info;

  const objectives = getEvaluableLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);

  const { evaluationCollections } = group.currentModule;
  const classParticipationCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "ClassParticipationCollection">>(
      isClassParticipationCollection
    );
  const otherCollections =
    evaluationCollections.filter<WithTypename<(typeof evaluationCollections)[number], "DefaultCollection">>(isDefaultCollection);

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

  const feedbackProgressTranslateY = useSharedValue(FEEDBACK_PROGRESS_HEIGHT);

  const feedbackProgressAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: feedbackProgressTranslateY.value }],
    };
  });

  React.useEffect(() => {
    if (isGeneratingFeedbacks) {
      feedbackProgressTranslateY.value = withTiming(0, { duration: 200 });
    } else {
      feedbackProgressTranslateY.value = withTiming(FEEDBACK_PROGRESS_HEIGHT, { duration: 200 });
    }
  }, [isGeneratingFeedbacks, feedbackProgressTranslateY]);

  const generateFinalFeedback = () => {
    generateFeedbacks(() => {
      openToast(
        t("final-feedback-finished", "Loppupalaute generoitu ryhmälle {{groupName}}", { groupName: group.name }),
        { closeTimeout: 10000 },
        () => navigation.navigate("final-feedback-collection", { groupId: group.id }),
        t("inspect", "Tarkastele")
      );
    });
    closeModal();
  };

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
              {t("class-evaluation-count", "{{count}} tuntiarviointia", {
                count: group.currentModule.evaluationCollections.filter((ev) => ev.type.category === "CLASS_PARTICIPATION").length,
              })}
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
        {otherSelectedTypes.length > 0 && (
          <CView style={{ gap: 20 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-types", "Arviointikohteet")}</CText>
            <CView style={{ gap: 5 }}>
              {otherSelectedTypes.map((type, i) => {
                const evaluation = otherSelectedTypeEvaluations[i];
                return (
                  <Card
                    style={{
                      borderColor: "primary",
                      borderWidth: 1,
                    }}
                    key={type.id}
                  >
                    <CTouchableOpacity
                      style={{ flex: 1, height: 50, gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                      onPress={() => {
                        navigation.navigate("default-evaluation-collection", {
                          id: type.id,
                          collectionId: type.defaultTypeCollection?.id,
                          name: type.name,
                          archived: group.archived,
                        });
                      }}
                    >
                      <CView style={{ gap: 5 }}>
                        <CText style={{ fontSize: "md", fontWeight: "500" }}>{type.name}</CText>
                        <CText>
                          {type.category === "CLASS_PARTICIPATION" ? (
                            <CText />
                          ) : (
                            <CText style={{ fontSize: "sm", color: "gray" }}>
                              {getCollectionTypeTranslation(t, type.category as CollectionTypeCategory)},{" "}
                            </CText>
                          )}
                          <CText style={{ fontSize: "sm", color: "gray" }}>
                            {type.category === "CLASS_PARTICIPATION"
                              ? t("evaluated-continuously", "jatkuvasti arvioitava")
                              : t("evaluated-once", "Kerran arvioitava").toLocaleLowerCase()}
                          </CText>
                        </CText>
                      </CView>
                      {!evaluation && (
                        <CButton
                          variant="empty"
                          textStyle={{ color: "primary", fontSize: "sm", fontWeight: "500" }}
                          title={t("evaluate", "Arvioi").toLocaleUpperCase()}
                          onPress={() => {
                            navigation.navigate("default-collection-create", { groupId: group.id, collectionTypeId: type.id });
                          }}
                        />
                      )}
                      {evaluation && (
                        <CText style={{ color: "gray", fontSize: "sm", fontWeight: "500" }}>{t("evaluated", "Arvioitu").toLocaleUpperCase()}</CText>
                      )}
                    </CTouchableOpacity>
                  </Card>
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
              if (finalFeedbackGenerated) navigation.navigate("final-feedback-collection", { groupId: group.id });
              else
                openModal({
                  title: t("final-feedback", "Loppuarviointi"),
                  children: (
                    <CView style={{ gap: 10 }}>
                      <CText style={{ fontSize: "sm", fontWeight: "300" }}>
                        {t(
                          "group-final-feedback-info",
                          "Generoi loppupalaute koko ryhmälle perustuen antamiisi numeerisiin ja sanallisiin palautteisiin. Palautteen generointi tapahtuu taustalla, voit liikkua sovelluksessa vapaasti tai sulkea sovelluksen generoinnin ajaksi."
                        )}
                      </CText>
                      {otherSelectedTypeEvaluations.filter((ev) => ev).length < otherSelectedTypes.length && (
                        <CView style={{ gap: 5 }}>
                          <CText style={{ fontSize: "sm", fontWeight: "500" }}>
                            {t("other-type-evaluations-missing", "HUOM! Seuraavat arviointikohteet ovat arvioimatta:")}
                          </CText>
                          <CView>
                            {otherSelectedTypes
                              .filter((_, i) => !otherSelectedTypeEvaluations[i])
                              .map((type) => {
                                return (
                                  <CText key={type.id} style={{ fontSize: "sm", fontWeight: "500" }}>
                                    {type.name}
                                  </CText>
                                );
                              })}
                          </CView>
                        </CView>
                      )}
                      <CButton title={t("generate", "Generoi")} size="small" onPress={generateFinalFeedback} />
                    </CView>
                  ),
                });
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
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingLeft: 10,
              gap: 5,
              height: FEEDBACK_PROGRESS_HEIGHT,
              flexDirection: "row",
              backgroundColor: COLORS.primary,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            },
            feedbackProgressAnimatedStyle,
          ]}
        >
          <ActivityIndicator color={COLORS.white} size="large" />
          <CText style={{ color: "white" }}>{t("generating-final-feedback", "Loppupalautetta generoidaan...")}</CText>
        </Animated.View>
      )}
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
