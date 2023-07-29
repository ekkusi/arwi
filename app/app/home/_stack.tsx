import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeView from ".";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import { formatDate } from "../../helpers/dateHelpers";
import { useModal } from "../../hooks-and-providers/ModalProvider";
import { defaultHeaderStyles } from "../config";
import ChangeGroupName from "./ChangeGroupName";
import CollectionView from "./collection";
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
  const { openModal, closeModal } = useModal();
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
                <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
                  <MenuOption
                    onSelect={() => {
                      openModal({
                        title: t("change-group-name", "Muuta ryhmän nimeä"),
                        children: (
                          <ChangeGroupName
                            id={route.params.id}
                            name={route.params.name}
                            onCancel={closeModal}
                            onSaved={(name) => {
                              navigation.setParams({ name });
                              closeModal();
                            }}
                          />
                        ),
                      });
                    }}
                  >
                    <CText>{t("change-name", "Muuta nimeä")}</CText>
                  </MenuOption>
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
                </CView>
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
