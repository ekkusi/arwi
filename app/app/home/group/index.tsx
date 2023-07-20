import { useQuery } from "@apollo/client";
import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TabView, SceneRendererProps, Route, NavigationState } from "react-native-tab-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../../components/Card";
import CollectionsLineChart from "../../../components/charts/CollectionsLineChart";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CFlatList from "../../../components/primitives/CFlatList";
import CText from "../../../components/primitives/CText";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import ShadowButton from "../../../components/primitives/ShadowButton";
import { graphql } from "../../../gql";
import { GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import { formatDate } from "../../../helpers/dateHelpers";
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
          }
          ...CollectionsLineChart_EvaluationCollection
        }
      }
    }
  }
`);

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
  return group.currentClassYear.students.length > 0 ? (
    <CFlatList
      data={group.currentClassYear.students}
      renderItem={({ item }) => (
        <Card style={{ marginBottom: "md" }}>
          <CTouchableOpacity onPress={() => navigation.navigate("student", item)}>
            <CText>{item.name}</CText>
          </CTouchableOpacity>
        </Card>
      )}
    />
  ) : (
    <CText>{t("group.no-students", "Ryhmässä ei ole oppilaita")}</CText>
  );
}

function EvaluationList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();
  return (
    <CView style={{ flexGrow: 1, paddingHorizontal: "sm" }}>
      {group.currentClassYear.evaluationCollections.length > 0 ? (
        <CFlatList
          data={group.currentClassYear.evaluationCollections}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: "md" }}>
              <CTouchableOpacity onPress={() => navigation.navigate("collection", { ...item, environmentLabel: item.environment.label })}>
                <CText>{`${formatDate(item.date)}: ${item.environment.label}`}</CText>
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
  return objectives.length > 0 ? (
    // TODO: Show pie chart and make list into accordion with more info about the objective when opened
    <CFlatList
      data={objectives}
      renderItem={({ item }) => (
        <Card style={{ marginBottom: "md" }}>
          <CText>{`${item.code}: ${item.label}`}</CText>
        </Card>
      )}
    />
  ) : (
    <CText>
      {t("group.no-objectives", "Annetulle aineelle ei olla kirjattu tavoitteita tai jotain muuta on pielessä. Ilmoita tieto kehittäjille, kiitos.")}
    </CText>
  );
}

function StatisticsView({ getGroup: group }: GroupOverviewPage_GetGroupQuery) {
  return <CollectionsLineChart collections={group.currentClassYear.evaluationCollections} style={{ marginBottom: "xl" }} />;
}

export default function GroupView({ route: { params }, navigation }: NativeStackScreenProps<HomeStackParams, "group">) {
  const { id } = params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [routes] = useState([
    { key: "evaluations", title: t("group.evaluations", "Arvioinnit") },
    { key: "students", title: t("group.students", "Oppilaat") },
    { key: "objectives", title: t("group.objectives", "Tavoitteet") },
    { key: "statistics", title: t("group.statistics", "Kuvaajat") },
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
        return <StatisticsView {...data} />;
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
        sceneContainerStyle={{ paddingTop: SPACING.lg }}
      />
    </CView>
  );
}
