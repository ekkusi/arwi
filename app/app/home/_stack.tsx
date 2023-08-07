import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import HomeView from ".";
import CText from "../../components/primitives/CText";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import CView from "../../components/primitives/CView";
import { formatDate } from "../../helpers/dateHelpers";
import { useModal } from "../../hooks-and-providers/ModalProvider";
import { COLORS } from "../../theme";
import { defaultHeaderStyles } from "../config";
import ProfileView from "../profile";
import ChangeGroupName from "./ChangeGroupName";
import CollectionView from "./collection";
import CollectionCreationStack from "./collection/create/_stack";
import Evaluation from "./evaluation/edit_evaluation";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import LearningObjective from "./group/learningObjective";
import StudentView from "./student";
import { HomeStackParams } from "./types";
import { graphql } from "../../gql";
import EditCollectionGeneralInfoView from "./collection/edit_general_info";
import CollectionEditAllEvaluationsView from "./collection/edit_all_evaluations";
import EvaluationEditView from "./evaluation/edit_evaluation";

const CollectionHeaderRightButton_DeleteCollection_Mutation = graphql(`
  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id) {
      id
      classYear {
        id
        evaluationCollections {
          id
        }
        group {
          id
          name
        }
      }
    }
  }
`);

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

function CollectionHeaderRightButton({ id, navigation }: { id: string; navigation: NativeStackNavigationProp<HomeStackParams, "collection"> }) {
  const { t } = useTranslation();
  const [deleteCollection] = useMutation(CollectionHeaderRightButton_DeleteCollection_Mutation);
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
          <MenuOption
            onSelect={() => {
              navigation.navigate("collection-edit", { collectionId: id });
            }}
          >
            <CText>{t("edit-general-details", "Muokkaa yleistietoja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              navigation.navigate("edit-all-evaluations", { collectionId: id });
            }}
          >
            <CText>{t("edit-evaluations", "Muokkaa arviointeja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              Alert.alert(
                t("delete-evaluation-confirmation-title", "Oletko varma?"),
                t("delete-evaluation-confirmation-info", "Jos poistat arvioinnin, menetät kaikki arviointiin liittyvät tietot :("),
                [
                  {
                    text: t("no", "Ei"),
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: t("yes", "Kyllä"),
                    onPress: async () => {
                      await deleteCollection({
                        variables: { id },
                        update: (cache, { data }) => {
                          if (!data) throw new Error("Unexpected error: No data returned from mutation");
                        },
                      });
                      navigation.goBack();
                    },
                  },
                ]
              );
            }}
          >
            <CText>{t("delete-evaluation", "Poista arviointi")}</CText>
          </MenuOption>
        </CView>
      </MenuOptions>
    </Menu>
  );
}

export default function HomeStack() {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  return (
    <HomeStackNavigator.Navigator id="home-stack" initialRouteName="index" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen
        name="index"
        component={HomeView}
        options={({ navigation }) => {
          return {
            title: t("HomeStack.ownGroups", "Omat ryhmät"),
            headerRight: () => (
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
        options={({ route, navigation }) => ({
          title: "",
          headerRight: () => <CollectionHeaderRightButton id={route.params.id} navigation={navigation} />,
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
      <HomeStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <HomeStackNavigator.Screen name="learning-objective" component={LearningObjective} options={({ route }) => ({ title: route.params.code })} />
      </HomeStackNavigator.Group>
    </HomeStackNavigator.Navigator>
  );
}
