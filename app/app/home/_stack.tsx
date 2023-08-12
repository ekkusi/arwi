import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeView from ".";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import CView from "../../components/primitives/CView";
import { COLORS } from "../../theme";
import { defaultHeaderStyles } from "../config";
import ProfileView from "../profile";
import CollectionView from "./collection";
import CollectionCreationStack from "./collection/create/_stack";
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
import { formatDate } from "../../helpers/dateHelpers";

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack() {
  const { t } = useTranslation();
  return (
    <HomeStackNavigator.Navigator id="home-stack" initialRouteName="index" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen
        name="index"
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
                  <Ionicons name="person-outline" size={25} color={COLORS.white} />
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
                  <MaterialCommunityIcon name="history" size={25} color={COLORS.white} />
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
        name="collection"
        component={CollectionView}
        options={({ route, navigation }) => ({
          title: `${route.params.date}: ${route.params.environmentLabel}`,
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
      <HomeStackNavigator.Screen name="collection-edit" component={EditCollectionGeneralInfoView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="edit-evaluation" component={EvaluationEditView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="profile" component={ProfileView} options={{ title: t("profile", "Profiili") }} />
      <HomeStackNavigator.Screen name="edit-all-evaluations" component={CollectionEditAllEvaluationsView} options={{ title: t("edit", "Muokkaa") }} />
      <HomeStackNavigator.Screen name="archive" component={ArchivePage} options={{ title: t("archive", "Arkisto") }} />
      <HomeStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <HomeStackNavigator.Screen name="learning-objective" component={LearningObjective} options={({ route }) => ({ title: route.params.code })} />
      </HomeStackNavigator.Group>
    </HomeStackNavigator.Navigator>
  );
}
