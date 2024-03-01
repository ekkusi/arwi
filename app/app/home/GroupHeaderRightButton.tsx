import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeStackParams } from "./types";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import { useModal } from "../../hooks-and-providers/ModalProvider";
import ChangeGroupName from "./ChangeGroupName";
import AddNewStudent from "./AddNewStudent";
import ChangeGroupModule from "./ChangeGroupModule";
import ChangeArchiveStatus from "./ChangeArchiveStatus";
import { useToast } from "../../hooks-and-providers/ToastProvider";

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
  const { openToast } = useToast();

  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
          {!archived ? (
            <>
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
                          openToast(t("student-added-succesfully", "Oppilas lisätty onnistuneesti!"));
                        }}
                      />
                    ),
                  });
                }}
              >
                <CText>{t("group.edit-students", "Lisää oppilas")}</CText>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  navigation.navigate("collection-create", { groupId: id });
                }}
              >
                <CText>{t("new-class-evaluation", "Uusi tuntiarviointi")}</CText>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  openModal({
                    title: t("change-class-year", "Vaihda vuosiluokka"),
                    children: <ChangeGroupModule groupId={id} onCancel={closeModal} onSaved={closeModal} />,
                  });
                }}
              >
                <CText>{t("change-class-year", "Vaihda vuosiluokka")}</CText>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  navigation.navigate("edit-evaluation-types", { groupId: id });
                }}
              >
                <CText>{t("edit-evaluation-types", "Muokkaa arviointisisältöjä")}</CText>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  openModal({
                    title: t("archive-group", "Arkistoi ryhmä"),
                    children: (
                      <ChangeArchiveStatus
                        groupId={id}
                        newStatus
                        text={t(
                          "archive-group-info",
                          "Arkistoimalla ryhmän, ryhmä poistuu etusivun listalta. Ryhmän tietoja pääsee kuitenkin tarkastelemaan vielä ryhmäarkistosta."
                        )}
                        onCancel={closeModal}
                        onChanged={() => {
                          navigation.goBack();
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
              >
                <CText>{t("archive-group", "Arkistoi ryhmä")}</CText>
              </MenuOption>
            </>
          ) : (
            <MenuOption
              onSelect={() => {
                openModal({
                  title: t("unarchive-group", "Palauta arkistosta"),
                  children: (
                    <ChangeArchiveStatus
                      groupId={id}
                      newStatus={false}
                      text={t("unarchive-group-info", "Palauta ryhmä arkistosta takaisin etusivulle.")}
                      onCancel={closeModal}
                      onChanged={() => {
                        navigation.goBack();
                        closeModal();
                      }}
                    />
                  ),
                });
              }}
            >
              <CText>{t("unarchive-group", "Palauta arkistosta")}</CText>
            </MenuOption>
          )}
        </CView>
      </MenuOptions>
    </Menu>
  );
}
