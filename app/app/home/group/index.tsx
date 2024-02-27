import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { TabView, SceneRendererProps, Route, NavigationState } from "react-native-tab-view";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import { COLORS } from "../../../theme";
import { CColor } from "../../../theme/types";
import { HomeStackParams } from "../types";
import StatisticsView from "./StatisticsView";
import EvaluationList from "./EvaluationList";
import ObjectiveList from "./ObjectiveList";
import { GroupOverviewPage_GetGroup_Query } from "./graphql";
import StudentList from "./StudentList";

const StudentListMemoed = memo(StudentList);
const EvaluationListMemoed = memo(EvaluationList);
const ObjectiveListMemoed = memo(ObjectiveList);
const StatisticsViewMemoed = memo(StatisticsView);

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
        return <EvaluationListMemoed {...data} navigation={navigation} />;
      case "students":
        return <StudentListMemoed {...data} navigation={navigation} />;
      case "objectives":
        return <ObjectiveListMemoed {...data} navigation={navigation} />;
      case "statistics":
        return <StatisticsViewMemoed {...data} navigation={navigation} />;
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
