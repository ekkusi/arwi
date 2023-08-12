import { useMutation } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";
import { graphql } from "../../gql";
import { HomeStackParams } from "./types";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import { useModal } from "../../hooks-and-providers/ModalProvider";
import { getErrorMessage } from "../../helpers/errorUtils";
import ChangeGroupName from "./ChangeGroupName";
import AddNewStudent from "./AddNewStudent";

const GroupHeaderRightButton_UpdateGroup_Mutation = graphql(`
  mutation GroupHeaderRightButton_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(groupId: $id, data: $input) {
      id
      archived
    }
  }
`);

export default function GroupHeaderRightButton({
  id,
  classYearId,
  name,
  archived,
  navigation,
}: {
  id: string;
  classYearId: string;
  name: string;
  archived: boolean;
  navigation: NativeStackNavigationProp<HomeStackParams, "group">;
}) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();

  const [updateGroup, { loading }] = useMutation(GroupHeaderRightButton_UpdateGroup_Mutation);

  const changeGroupArchiveStatus = async (newArchived: boolean) => {
    try {
      await updateGroup({
        variables: {
          id,
          input: {
            archived: newArchived,
          },
        },
      });
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    }
  };

  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
          {!archived && (
            <MenuOption
              onSelect={() => {
                openModal({
                  title: t("edit-group-name", "Muokkaa ryhmän nimeä"),
                  children: (
                    <ChangeGroupName
                      id={id}
                      name={name}
                      onCancel={closeModal}
                      onSaved={(newName) => {
                        navigation.setParams({ name: newName });
                        closeModal();
                      }}
                    />
                  ),
                });
              }}
            >
              <CText>{t("edit-name", "Muokkaa nimeä")}</CText>
            </MenuOption>
          )}
          {!archived && (
            <MenuOption
              onSelect={() => {
                openModal({
                  title: t("add-student", "Lisää oppilas"),
                  children: (
                    <AddNewStudent
                      classYearId={classYearId}
                      onCancel={closeModal}
                      onSaved={() => {
                        closeModal();
                        // TODO: Indicator that adding student was completed
                        Alert.alert("Lisäys onnistui!");
                      }}
                    />
                  ),
                });
              }}
            >
              <CText>{t("group.edit-students", "Lisää oppilas")}</CText>
            </MenuOption>
          )}
          {!archived && (
            <MenuOption
              onSelect={() => {
                navigation.navigate("collection-create", { groupId: id });
              }}
            >
              <CText>{t("new-evaluation", "Uusi arviointi")}</CText>
            </MenuOption>
          )}
          {archived ? (
            <MenuOption
              onSelect={() => {
                Alert.alert(t("unarchive-group", "Palauta arkistosta"), t("unarchive-group-info", "Palauta ryhmä arkistosta takaisin etusivulle."), [
                  {
                    text: t("no", "Ei"),
                    onPress: () => null,
                    style: "cancel",
                  },
                  { text: t("yes", "Kyllä"), onPress: () => changeGroupArchiveStatus(false) },
                ]);
              }}
            >
              <CText>{t("unarchive-group", "Palauta arkistosta")}</CText>
            </MenuOption>
          ) : (
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  t("archive-group", "Arkistoi ryhmä"),
                  t(
                    "archive-group-info",
                    "Arkistoimalla ryhmän, ryhmä poistuu etusivun listalta. Ryhmän tietoja pääsee kuitenkin tarkastelemaan vielä ryhmäarkistosta."
                  ),
                  [
                    {
                      text: t("no", "Ei"),
                      onPress: () => null,
                      style: "cancel",
                    },
                    { text: t("yes", "Kyllä"), onPress: () => changeGroupArchiveStatus(true) },
                  ]
                );
              }}
            >
              <CText>{t("archive-group", "Arkistoi ryhmä")}</CText>
            </MenuOption>
          )}
        </CView>
      </MenuOptions>
    </Menu>
  );
}
