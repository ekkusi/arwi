import { useQuery } from "@apollo/client";
import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { getEnvironments, getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TabView, SceneRendererProps, Route, NavigationState } from "react-native-tab-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../../components/Card";
import CollectionsLineChart from "../../../components/charts/CollectionsLineChart";
import EnvironmentsBarChart, { EnvironmentBarChartDataType } from "../../../components/charts/EnvironmentsBarChart";
import LineChartBase, { DataType } from "../../../components/charts/LineChartBase";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CFlatList from "../../../components/primitives/CFlatList";
import CImage from "../../../components/primitives/CImage";
import CText from "../../../components/primitives/CText";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import ShadowButton from "../../../components/primitives/ShadowButton";
import { getFragmentData, graphql } from "../../../gql";
import { CollectionsLineChart_EvaluationCollectionFragment, GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import { getPredefinedColors, subjectToIcon } from "../../../helpers/dataMappers";
import { formatDate } from "../../../helpers/dateHelpers";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import { COLORS, SPACING } from "../../../theme";
import { CColor } from "../../../theme/types";
import { HomeStackParams } from "../types";

const GroupOverviewPage_GetGroup_Query = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      subject {
        label
        code
      }
      currentClassYear {
        info {
          code
          label
        }
        students {
          id
          name
        }
        evaluationCollections {
          id
          date
          environment {
            label
            color
          }
          ...CollectionsLineChart_EvaluationCollection
        }
      }
    }
  }
`);

const CollectionsLineChart_Collection_Fragment = graphql(`
  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {
    id
    date
    environment {
      label
      code
    }
    evaluations {
      skillsRating
      behaviourRating
      wasPresent
      isStellar
    }
  }
`);

const mapData = (collections: CollectionsLineChart_EvaluationCollectionFragment[]) => {
  const data: DataType[] = [];
  let currentSkillsSum = 0;
  let notNullSkillsCount = 0;
  let currentBehaviourSum = 0;
  let notNullBehaviourCount = 0;
  collections.forEach((it) => {
    const { skillsAverage, behaviourAverage } = analyzeEvaluations(it.evaluations);
    if (skillsAverage > 0) {
      notNullSkillsCount += 1;
      currentSkillsSum += skillsAverage;
    }
    if (behaviourAverage > 0) {
      notNullBehaviourCount += 1;
      currentBehaviourSum += behaviourAverage;
    }
    data.push({
      date: formatDate(it.date),
      skills: skillsAverage > 0 ? Math.round((currentSkillsSum / notNullSkillsCount) * 100) / 100 : null,
      behaviour: behaviourAverage > 0 ? Math.round((currentBehaviourSum / notNullBehaviourCount) * 100) / 100 : null,
    });
  });
  return data;
};

const GroupOverviewPage_DeleteGroup_Mutation = graphql(`
  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`);

type NavigationProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group">["navigation"];
};

function StudentList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();
  return (
    <CView style={{ flexGrow: 1, padding: "lg" }}>
      {group.currentClassYear.students.length > 0 ? (
        <CFlatList
          data={group.currentClassYear.students}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: "md" }}>
              <CTouchableOpacity onPress={() => navigation.navigate("student", item)}>
                <CText style={{ fontSize: "md", fontWeight: "400" }}>{item.name}</CText>
              </CTouchableOpacity>
            </Card>
          )}
        />
      ) : (
        <CView style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ width: "60%" }}>{t("group.no-students", "Ryhmässä ei ole oppilaita")}</CText>
        </CView>
      )}
    </CView>
  );
}

function EvaluationList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();

  return (
    <CView style={{ flexGrow: 1, padding: "lg" }}>
      {group.currentClassYear.evaluationCollections.length > 0 ? (
        <CFlatList
          data={group.currentClassYear.evaluationCollections}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: "md" }}>
              <CTouchableOpacity onPress={() => navigation.navigate("collection", { ...item, environmentLabel: item.environment.label })}>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{item.environment.label}</CText>
                <CView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <CView style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: item.environment.color }} />
                  <CText style={{ fontSize: "sm", color: "gray" }}>{formatDate(item.date)}</CText>
                </CView>
              </CTouchableOpacity>
            </Card>
          )}
        />
      ) : (
        <CText>{t("group.no-collections", "Ryhmälle ei vielä olla tehty arviointeja")}</CText>
      )}
      <ShadowButton
        style={{ position: "absolute", bottom: 20, right: 15 }}
        title={t("group.new-evaluation", "Uusi arviointi")}
        onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
        leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
      />
    </CView>
  );
}

function ObjectiveList({ getGroup: group }: GroupOverviewPage_GetGroupQuery) {
  const objectives = getLearningObjectives(group.subject.code, group.currentClassYear.info.code);
  const { t } = useTranslation();

  return (
    <CView style={{ flexGrow: 1, padding: "lg" }}>
      {objectives.length > 0 ? (
        // TODO: Show pie chart and make list into accordion with more info about the objective when opened
        // Add REAL objective count to string
        <CFlatList
          data={objectives}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: "md" }}>
              <CText>{`${item.code}: ${item.label}`}</CText>
              <CText style={{ fontSize: "sm", fontWeight: "400", color: "gray" }}>
                {t("group.objective-evaluation-count", "Arvioitu {{count}} kertaa", { count: 10 })}
              </CText>
            </Card>
          )}
        />
      ) : (
        <CView style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ width: "80%" }}>
            {t(
              "group.no-objectives",
              "Annetulle aineelle ei olla kirjattu tavoitteita tai jotain muuta on pielessä. Ilmoita tieto kehittäjille, kiitos."
            )}
          </CText>
        </CView>
      )}
    </CView>
  );
}

function StatisticsView({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();

  const lastEvaluation = [...group.currentClassYear.evaluationCollections].sort((a, b) => (a.date > b.date ? 1 : -1))[0];
  const environments = getEnvironments(group.subject.code);

  const environmentsAndCounts: EnvironmentBarChartDataType[] = environments.map((environment, idx) => {
    return {
      x: environment.label,
      color: environment.color,
      y: group.currentClassYear.evaluationCollections.reduce(
        (val, evaluation) => (evaluation.environment.label === environment.label ? val + 1 : val),
        0
      ),
    };
  });

  const collections = getFragmentData(CollectionsLineChart_Collection_Fragment, group.currentClassYear.evaluationCollections);

  const sortedCollections = [...collections].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const evaluationData = mapData(sortedCollections);

  const evaluationsWithSkills = evaluationData.filter((obj) => obj.skills !== undefined);
  const skillsMean = evaluationsWithSkills.reduce((prev, evaluation) => prev + (evaluation.skills || 0), 0) / evaluationsWithSkills.length;

  const evaluationsWithBehaviour = evaluationData.filter((obj) => obj.behaviour !== undefined);
  const behaviourMean =
    evaluationsWithBehaviour.reduce((prev, evaluation) => prev + (evaluation.behaviour || 0), 0) / evaluationsWithBehaviour.length;

  return (
    <CView style={{ flexGrow: 1, backgroundColor: "white", paddingHorizontal: "lg" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2xl" }}>
          <CView>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{group.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.currentClassYear.info.label}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{group.subject.label}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {t("group.evaluation-count", "{{count}} arviointia", { count: group.currentClassYear.evaluationCollections.length })}
            </CText>
          </CView>
          <CView>
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
          </CView>
        </CView>

        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("group.environment-counts-title", "Ympäristöt")}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.environment-counts", "Arviointikerrat ympäristöittäin")}</CText>
          <EnvironmentsBarChart data={environmentsAndCounts} style={{ height: 200 }} />
          <CView style={{ gap: 2, flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap", width: "100%" }}>
            {environmentsAndCounts.map((envAndCount) => (
              <CView style={{ justifyContent: "space-between", flexDirection: "row", width: "40%", marginRight: 30 }}>
                <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
                  <CView style={{ width: 10, height: 10, backgroundColor: envAndCount.color }} />
                  <CText style={{ fontSize: "sm" }}>{envAndCount.x}</CText>
                </CView>
                <CText style={{ fontSize: "sm", fontWeight: "600" }}>{envAndCount.y}</CText>
              </CView>
            ))}
          </CView>
        </CView>
        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("group.evaluation-means-title", "Arvioinnit")}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.evaluations-over-time", "Arvointien keskiarvojen kehitys")}</CText>
          <LineChartBase data={evaluationData} style={{ marginBottom: "xl" }} />
          <CView style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <CView style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
              <CText style={{ fontSize: "xs", fontWeight: "500" }}>{t("group.skills-mean", "Taitojen keskiarvo")}</CText>
              <CView
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CText style={{ fontSize: "title", fontWeight: "700" }}>{skillsMean.toFixed(1)}</CText>
              </CView>
            </CView>
            <CView style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
              <CText style={{ fontSize: "xs", fontWeight: "500" }}>{t("group.behaviour-mean", "Työskentelyn keskiarvo")}</CText>
              <CView
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CText style={{ fontSize: "title", fontWeight: "700" }}>{behaviourMean.toFixed(1)}</CText>
              </CView>
            </CView>
          </CView>
        </CView>
      </ScrollView>
      <ShadowButton
        style={{ position: "absolute", bottom: 20, right: 15 }}
        title={t("group.new-evaluation", "Uusi arviointi")}
        onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
        leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
      />
    </CView>
  );
}

export default function GroupView({ route: { params }, navigation }: NativeStackScreenProps<HomeStackParams, "group">) {
  const { id } = params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [routes] = useState([
    { key: "statistics", title: t("group.statistics", "Tiedot") },
    { key: "evaluations", title: t("group.evaluations", "Arvioinnit") },
    { key: "students", title: t("group.students", "Oppilaat") },
    { key: "objectives", title: t("group.objectives", "Tavoitteet") },
  ]);

  if (!id) throw new Error("No id found, incorrect route");

  const { data, loading } = useQuery(GroupOverviewPage_GetGroup_Query, {
    variables: {
      groupId: id,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const { getGroup: group } = data;

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
    return (
      <CView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomColor: COLORS.lightgray,
          borderBottomWidth: 1,
          backgroundColor: "white",
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          const borderColor: CColor = i === index ? "primary" : "white";
          return (
            <CTouchableOpacity
              key={route.key}
              onPress={() => setIndex(i)}
              style={{
                paddingVertical: "xl",
                paddingHorizontal: "xs",
                borderBottomColor: borderColor,
                borderBottomWidth: 3,
                flex: 1,
                alignItems: "center",
              }}
            >
              <CText style={{ fontSize: "sm", fontWeight: "500", color: props.navigationState.index === i ? "darkgray" : "gray" }}>
                {route.title}
              </CText>
            </CTouchableOpacity>
          );
        })}
      </CView>
    );
  };

  const renderScene = ({ route }: SceneRendererProps & { route: Route }) => {
    switch (route.key) {
      case "evaluations":
        return <EvaluationList {...data} navigation={navigation} />;
      case "students":
        return <StudentList {...data} navigation={navigation} />;
      case "objectives":
        return <ObjectiveList {...data} />;
      case "statistics":
        return <StatisticsView {...data} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <CView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </CView>
  );
}
