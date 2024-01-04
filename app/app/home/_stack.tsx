import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeView from ".";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import CView from "../../components/primitives/CView";
import { COLORS } from "../../theme";
import { defaultHeaderStyles } from "../config";
import ProfileView from "../profile";
import CollectionView from "./collection";
import CollectionCreationStack from "./collection/create/_stack";
import DefaultCollectionCreationStack from "./collection/create/default/_stack";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import LearningObjective from "./group/learningObjective";
import StudentView from "./student";
import { HomeStackParams } from "./types";
import EditCollectionGeneralInfoView from "./collection/edit_general_info";
import CollectionEditAllEvaluationsView from "./collection/edit_all_evaluations";
import EvaluationEditView from "./evaluation/edit_evaluation";
import ArchivePage from "../archive";
import GroupHeaderRightButton from "./GroupHeaderRightButton";
import CollectionHeaderRightButton from "./CollectionHeaderRightButton";
import StudentHeaderRightButton from "./StudentHeaderRightButton";
import StudentFeedbackView from "./student/feedback";
import DefaultEvaluationCollection from "./group/DefaultEvaluationCollection";

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack() {
  const { t } = useTranslation();
  return (
    <HomeStackNavigator.Navigator id="home-stack" initialRouteName="home" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen
        name="home"
        component={HomeView}
        options={({ navigation }) => {
          return {
            title: t("HomeStack.ownGroups", "Omat ryhmät"),
            headerRight: () => (
              <CView style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CTouchableOpacity
                  onPress={() => navigation.navigate("profile")}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" size={23} color={COLORS.white} />
                </CTouchableOpacity>
                <CTouchableOpacity
                  onPress={() => navigation.navigate("archive")}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcon name="archive" size={23} color={COLORS.white} />
                </CTouchableOpacity>
              </CView>
            ),
          };
        }}
      />
      <HomeStackNavigator.Screen
        name="group"
        component={GroupView}
        options={({ navigation, route }) => ({
          title: route.params.name,
          headerRight: () => (
            <GroupHeaderRightButton
              id={route.params.id}
              classYearId={route.params.classYearId}
              archived={route.params.archived}
              name={route.params.name}
              navigation={navigation}
            />
          ),
        })}
      />
      <HomeStackNavigator.Screen
        name="student"
        component={StudentView}
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerRight: () =>
            route.params.archived ? undefined : <StudentHeaderRightButton id={route.params.id} name={route.params.name} navigation={navigation} />,
        })}
      />
      <HomeStackNavigator.Screen
        name="student-feedback"
        component={StudentFeedbackView}
        options={{
          title: t("final-feedback", "Loppuarviointi"),
        }}
      />
      <HomeStackNavigator.Screen
        name="collection"
        component={CollectionView}
        options={({ route, navigation }) => ({
          title: `${route.params.date}: ${route.params.environmentLabel.fi}`,
          headerRight: () => (route.params.archived ? undefined : <CollectionHeaderRightButton id={route.params.id} navigation={navigation} />),
        })}
      />
      <HomeStackNavigator.Screen
        name="group-create"
        component={GroupCreationStack}
        options={{ title: t("HomeStack.newGroup", "Uusi ryhmä"), headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="collection-create"
        component={CollectionCreationStack}
        options={{ title: t("new-evaluation", "Uusi arviointi"), headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="default-collection-create"
        component={DefaultCollectionCreationStack}
        options={{ title: t("new-evaluation", "Uusi arviointi"), headerShown: false }}
      />
      <HomeStackNavigator.Screen name="collection-edit" component={EditCollectionGeneralInfoView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="edit-evaluation" component={EvaluationEditView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="profile" component={ProfileView} options={{ title: t("profile", "Profiili") }} />
      <HomeStackNavigator.Screen name="edit-all-evaluations" component={CollectionEditAllEvaluationsView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="archive" component={ArchivePage} options={{ title: t("archive", "Arkisto") }} />
      <HomeStackNavigator.Screen
        name="default-evaluation-collection"
        component={DefaultEvaluationCollection}
        options={(props) => {
          return { title: props.route.params.name };
        }}
      />
      <HomeStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <HomeStackNavigator.Screen name="learning-objective" component={LearningObjective} options={({ route }) => ({ title: route.params.code })} />
      </HomeStackNavigator.Group>
    </HomeStackNavigator.Navigator>
  );
}
