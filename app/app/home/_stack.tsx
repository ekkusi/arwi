import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeView from ".";
import CText from "../../components/primitives/CText";
import { formatDate } from "../../helpers/dateHelpers";
import { defaultHeaderStyles } from "../config";
import CollectionView from "./collection";
import CollectionEditView from "./collection/create/participations";
import CollectionCreationStack from "./collection/create/_stack";
import Evaluation from "./evaluation";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import LearningObjective from "./group/learningObjective";
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
        options={({ navigation, route }) => ({
          title: route.params.name,
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => {
                    Alert.alert("Uusi oppilas");
                  }}
                >
                  <CText>{t("group.edit-students", "Lisää oppilas")}</CText>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    navigation.navigate("collection-create", { groupId: route.params.id });
                  }}
                >
                  <CText>{t("new-evaluation", "Uusi arviointi")}</CText>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    Alert.alert("Oletko varma?", "Jos poistat ryhmän, takaisin ei ole enää paluuta :(");
                  }}
                >
                  <CText>{t("group.delete-group", "Poista ryhmä")}</CText>
                </MenuOption>
              </MenuOptions>
            </Menu>
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
        options={{ title: t("new-evaluation", "Uusi arviointi"), headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="evaluation"
        component={Evaluation}
        options={{ title: t("HomeStack.evaluationOverview", "Arvioinnin yhteenveto") }}
      />
      <HomeStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <HomeStackNavigator.Screen name="learning-objective" component={LearningObjective} options={({ route }) => ({ title: route.params.code })} />
      </HomeStackNavigator.Group>
    </HomeStackNavigator.Navigator>
  );
}
