import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeView from ".";
import { formatDate } from "../../helpers/dateHelpers";
import { defaultHeaderStyles } from "../config";
import CollectionView from "./collection";
import CollectionEditView from "./collection/create/participations";
import CollectionCreationStack from "./collection/create/_stack";
import Evaluation from "./evaluation";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import StudentView from "./student";
import { HomeStackParams } from "./types";

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack() {
  const { t } = useTranslation();
  return (
    <HomeStackNavigator.Navigator initialRouteName="index" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen name="index" component={HomeView} options={{ title: t("HomeStack.ownGroups", "Omat ryhmät") }} />
      <HomeStackNavigator.Screen
        name="group"
        component={GroupView}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Popup menu");
              }}
            >
              <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStackNavigator.Screen name="student" component={StudentView} options={({ route }) => ({ title: route.params.name })} />
      <HomeStackNavigator.Screen
        name="collection"
        component={CollectionView}
        options={({ route }) => ({ title: `${formatDate(route.params.date)}: ${route.params.environmentLabel}` })}
      />
      <HomeStackNavigator.Screen
        name="group-create"
        component={GroupCreationStack}
        options={{ title: t("HomeStack.newGroup", "Uusi ryhmä"), headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="collection-create"
        component={CollectionCreationStack}
        options={{ title: t("HomeStack.newEvaluation", "Uusi arviointi"), headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="collection-edit"
        component={CollectionEditView}
        options={{ title: t("HomeStack.newEvaluation", "Uusi arviointi") }}
      />
      <HomeStackNavigator.Screen
        name="evaluation"
        component={Evaluation}
        options={{ title: t("HomeStack.evaluationOverview", "Arvioinnin yhteenveto") }}
      />
    </HomeStackNavigator.Navigator>
  );
}
