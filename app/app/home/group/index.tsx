import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { getEnvironments, getEvaluableLearningObjectives, getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, TextInput, useWindowDimensions } from "react-native";
import { TabView, SceneRendererProps, Route, NavigationState } from "react-native-tab-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LearningObjectiveType } from "arwi-backend/src/types";
import Card from "../../../components/Card";
import StyledBarChart, { StyledBarChartDataType } from "../../../components/charts/StyledBarChart";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CFlatList from "../../../components/primitives/CFlatList";
import CImage from "../../../components/primitives/CImage";
import CText from "../../../components/primitives/CText";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { CollectionsLineChart_EvaluationCollectionFragment, GroupOverviewPage_GetGroupQuery } from "../../../gql/graphql";
import { getPredefinedColors, subjectToIcon } from "../../../helpers/dataMappers";
import { formatDate } from "../../../helpers/dateHelpers";
import { COLORS, SPACING } from "../../../theme";
import { CColor } from "../../../theme/types";
import { HomeStackParams } from "../types";
import CollectionStatistics from "../../../components/charts/CollectionStatistics";
import CButton from "../../../components/primitives/CButton";
import { useKeyboardListener } from "../../../hooks-and-providers/keyboardHooks";

const GroupOverviewPage_GetGroup_Query = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      archived
      subject {
        label {
          fi
        }
        code
      }
      currentModule {
        id
        info {
          educationLevel
          learningObjectiveGroupKey
          label {
            fi
          }
        }
        students {
          id
          name
          currentModuleEvaluations {
            id
            wasPresent
          }
        }
        evaluationCollections {
          id
          date
          environment {
            label {
              fi
            }
            code
            color
          }
          learningObjectives {
            code
            label {
              fi
            }
            description {
              fi
            }
            type
          }
          ...CollectionsLineChart_EvaluationCollection
        }
      }
    }
  }
`);

type NavigationProps = {
  navigation: NativeStackScreenProps<HomeStackParams, "group">["navigation"];
};

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcon);
const SearchBar = memo(function SearchBar({
  searchText,
  setSearchText,
  onChangeSearchState,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  onChangeSearchState: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [width, setWidth] = useState(48);
  const inputRef = useRef<TextInput>(null);

  const onHideKeyboard = useCallback(() => {
    if (searchText.length <= 0) {
      setSearchOpen(false);
      onChangeSearchState(false);
    }
    inputRef.current?.blur();
  }, [onChangeSearchState, searchText.length]);

  useKeyboardListener({
    onHide: onHideKeyboard,
  });
  const colorProgress = useDerivedValue(() => {
    return withTiming(searchOpen ? 1 : 0, { duration: 300 });
  });

  const iconAnimatedProps = useAnimatedProps(() => {
    const color = interpolateColor(colorProgress.value, [0, 1], [COLORS.white, COLORS.darkgray]);
    return { color };
  });

  const searchBarWidth = useSharedValue(48);
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(colorProgress.value, [0, 1], [COLORS.primary, COLORS.white]);
    return {
      width: withTiming(searchBarWidth.value, { duration: 300, easing: Easing.inOut(Easing.ease) }),
      backgroundColor,
    };
  });
  useEffect(() => {
    if (width !== 0) {
      searchBarWidth.value = searchOpen ? width : 48;
    }
  }, [searchOpen, searchBarWidth, width]);

  return (
    <CView style={{ width: "100%", alignItems: "flex-end" }} onLayout={(ev) => setWidth(ev.nativeEvent.layout.width)} pointerEvents="box-none">
      <Animated.View style={[{ height: 48, borderRadius: 24, borderWidth: 1, borderColor: COLORS.gray, overflow: "hidden" }, searchBarAnimatedStyle]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (inputRef.current) inputRef.current.focus();
            setSearchOpen(true);
            onChangeSearchState(true);
          }}
          disabled={searchOpen}
        >
          <CView pointerEvents={searchOpen ? undefined : "none"}>
            <TextInput
              ref={inputRef}
              showSoftInputOnFocus
              placeholder={t("find-by-name", "Etsi nimellä...")}
              onChange={(e) => setSearchText(e.nativeEvent.text)}
              onEndEditing={() => {
                if (searchText.length <= 0) setSearchOpen(false);
              }}
              style={{
                height: 48,
                width,
                paddingLeft: 48,
              }}
            />
            <CView style={{ position: "absolute", left: 0, width: 48, height: 48, justifyContent: "center", alignItems: "center" }}>
              <AnimatedIcon name="magnify" size={25} animatedProps={iconAnimatedProps} />
            </CView>
          </CView>
        </TouchableWithoutFeedback>
      </Animated.View>
    </CView>
  );
});
const StudentList = memo(function StudentList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();

  const translateY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const [searchOpen, setSearchOpen] = useState(false);
  const flatlistOffsetY = useSharedValue(0);

  useEffect(() => {
    flatlistOffsetY.value = searchOpen ? 48 : 0;
  }, [flatlistOffsetY, searchOpen]);

  const flatlistStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(flatlistOffsetY.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const searchBarStyle = useAnimatedStyle(() => {
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
        if (!searchOpen) {
          translateY.value = -100;
        }
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

  const [searchText, setSearchText] = useState("");
  const filteredStudents = group.currentModule.students.filter((student) => student.name.includes(searchText));

  return (
    <CView style={{ flex: 1 }}>
      {group.currentModule.students.length > 0 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ height: "100%" }}>
          <Animated.View style={[{ flex: 1 }, flatlistStyle]}>
            <Animated.FlatList
              onScroll={scrollHandler}
              contentContainerStyle={{ paddingTop: SPACING.md * 2, paddingBottom: 50, paddingHorizontal: SPACING.md }}
              showsVerticalScrollIndicator={false}
              data={filteredStudents}
              renderItem={({ item }) => {
                const presentClasses = item.currentModuleEvaluations.reduce(
                  (prevVal, evaluation) => (evaluation.wasPresent ? prevVal + 1 : prevVal),
                  0
                );
                const allClasses = group.currentModule.evaluationCollections.length;
                return (
                  <Card style={{ marginBottom: "md" }} key={item.id}>
                    <CTouchableOpacity onPress={() => navigation.navigate("student", { id: item.id, name: item.name, archived: group.archived })}>
                      <CText style={{ fontSize: "md", fontWeight: "500" }}>{item.name}</CText>
                      <CView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <CText style={{ fontSize: "sm", color: "gray" }}>
                          {t("present", "Paikalla")} {presentClasses}/{allClasses}
                        </CText>
                      </CView>
                    </CTouchableOpacity>
                  </Card>
                );
              }}
            />
          </Animated.View>
          <Animated.View
            pointerEvents="box-none"
            style={[{ position: "absolute", width: "100%", paddingTop: SPACING.md, paddingHorizontal: SPACING.md }, searchBarStyle]}
          >
            <SearchBar
              searchText={searchText}
              onChangeSearchState={(open) => {
                setSearchOpen(open);
              }}
              setSearchText={(text) => setSearchText(text)}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <CView style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ width: "60%" }}>{t("group.no-students", "Ryhmässä ei ole oppilaita")}</CText>
        </CView>
      )}
    </CView>
  );
});

const EvaluationList = memo(function EvaluationList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();

  const collections = [...group.currentModule.evaluationCollections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      {collections.length > 0 ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: SPACING.md }}
          data={collections}
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
        <CText style={{ paddingTop: 50, alignSelf: "center" }}>{t("group.no-collections", "Ryhmälle ei vielä olla tehty arviointeja")}</CText>
      )}
      {!group.archived && (
        <Animated.View style={[{ position: "absolute", bottom: 20, right: 15, backgroundColor: "rgba(0,0,0,0)" }, newEvaluationButtonStyle]}>
          <CButton
            shadowed
            title={t("new-evaluation", "Uusi arviointi")}
            onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
            leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
          />
        </Animated.View>
      )}
    </CView>
  );
});

const ObjectiveList = memo(function ObjectiveList({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const moduleInfo = group.currentModule.info;
  const objectives = getLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const { t } = useTranslation();

  const learningObjectiveCounts = objectives.map((objective) => {
    return {
      ...objective,
      count: group.currentModule.evaluationCollections.reduce(
        (val, evaluation) => (evaluation.learningObjectives.map((obj) => obj.code).includes(objective.code) ? val + 1 : val),
        0
      ),
    };
  });

  return (
    <CView style={{ flexGrow: 1, paddingHorizontal: "md" }}>
      {objectives.length > 0 ? (
        <CFlatList
          data={learningObjectiveCounts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: SPACING.md, paddingBottom: 50 }}
          renderItem={({ item }) => (
            <CTouchableOpacity
              key={item.code}
              onPress={() =>
                navigation.navigate("learning-objective", { code: item.code, label: item.label, description: item.description, type: item.type })
              }
            >
              <Card style={{ marginBottom: "md" }}>
                <CText>{`${item.code}: ${item.label.fi}`}</CText>
                <CText style={{ fontSize: "sm", fontWeight: "400", color: "gray" }}>
                  {item.type !== LearningObjectiveType.NOT_EVALUATED
                    ? t("group.objective-evaluation-count", "Arvioitu {{count}} kertaa", { count: item.count })
                    : t("not-evaluated", "Ei arvioitava")}
                </CText>
              </Card>
            </CTouchableOpacity>
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
});

const ObjectiveGraph = memo(function ObjectiveGraph({ data }: { data: StyledBarChartDataType[] }) {
  return <StyledBarChart data={data} style={{ height: 200 }} />;
});

const EnvironmentGraph = memo(function EnvironmentGraph({ data }: { data: StyledBarChartDataType[] }) {
  return <StyledBarChart data={data} style={{ height: 200 }} />;
});

const StatisticsView = memo(function StatisticsView({ getGroup: group, navigation }: GroupOverviewPage_GetGroupQuery & NavigationProps) {
  const { t } = useTranslation();

  const environments = getEnvironments(group.subject.code);
  const moduleInfo = group.currentModule.info;
  const objectives = getEvaluableLearningObjectives(group.subject.code, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const colorPalette = getPredefinedColors(objectives.length);

  const environmentsAndCounts: StyledBarChartDataType[] = useMemo(
    () =>
      environments.map((environment) => {
        return {
          x: environment.label.fi,
          color: environment.color,
          y: group.currentModule.evaluationCollections.reduce(
            (val, evaluation) => (evaluation.environment.label.fi === environment.label.fi ? val + 1 : val),
            0
          ),
        };
      }),
    [group, environments]
  );

  const learningObjectivesAndCounts: StyledBarChartDataType[] = useMemo(
    () =>
      objectives.map((objective, idx) => {
        return {
          x: `${objective.code}: ${objective.label.fi}`,
          color: colorPalette[idx],
          y: group.currentModule.evaluationCollections.reduce(
            (val, evaluation) => (evaluation.learningObjectives.map((obj) => obj.code).includes(objective.code) ? val + 1 : val),
            0
          ),
        };
      }),
    [group, objectives, colorPalette]
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
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("group.environments", "Ympäristöt")}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.environment-counts", "Arviointikerrat ympäristöittäin")}</CText>
          <EnvironmentGraph data={environmentsAndCounts} />
          <CView style={{ gap: 2, flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap", width: "100%" }}>
            {environmentsAndCounts.map((envAndCount, idx) => (
              <CView key={idx} style={{ justifyContent: "space-between", flexDirection: "row", width: "40%", marginRight: 30 }}>
                <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
                  <CView style={{ width: 10, height: 10, backgroundColor: envAndCount.color }} />
                  <CText style={{ fontSize: "sm" }}>{envAndCount.x}</CText>
                </CView>
                <CText style={{ fontSize: "sm", fontWeight: "600" }}>{envAndCount.y}</CText>
              </CView>
            ))}
          </CView>
        </CView>
        <CollectionStatistics
          title={t("group.evaluation-means-title", "Arvioinnit")}
          subjectCode={group.subject.code}
          collections={group.currentModule.evaluationCollections}
        />
        {objectives.length > 0 && (
          <CView style={{ gap: 10 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("group.objectives", "Tavoitteet")}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("group.objective-counts", "Arviointikerrat tavoitteittain")}</CText>
            <ObjectiveGraph data={learningObjectivesAndCounts} />
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
            onPress={() => navigation.navigate("collection-create", { groupId: group.id })}
            leftIcon={<MaterialCommunityIcon name="plus" size={30} color={COLORS.white} />}
          />
        </Animated.View>
      )}
    </CView>
  );
});

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
        return <EvaluationList {...data} navigation={navigation} />;
      case "students":
        return <StudentList {...data} navigation={navigation} />;
      case "objectives":
        return <ObjectiveList {...data} navigation={navigation} />;
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
