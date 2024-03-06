import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import { Alert } from "react-native";
import { graphql } from "@/graphql";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import { useModal } from "../../../hooks-and-providers/ModalProvider";
import ChangeStudentName from "../group/components/menu/ChangeStudentName";
import { getErrorMessage } from "../../../helpers/errorUtils";
import SaveAndCancelButtons from "../../../components/SaveAndCancelButtons";
import ViewMenuBase from "@/components/ViewMenuBase";

const StudentMenu_DeleteStudent_Mutation = graphql(`
  mutation StudentMenu_DeleteStudent($id: ID!) {
    deleteStudent(studentId: $id) {
      id
      group {
        id
        currentModule {
          id
          students {
            id
          }
          evaluationCollections {
            id
            evaluations {
              id
            }
          }
        }
      }
    }
  }
`);

function DeleteStudent({ studentId, onDeleted, onCancel }: { studentId: string; onDeleted: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [deleteStudent, { loading }] = useMutation(StudentMenu_DeleteStudent_Mutation, {
    variables: { id: studentId },
    onCompleted: onDeleted,
    onError: (e) => {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    },
  });

  return (
    <>
      <CText style={{ marginBottom: "lg" }}>
        {t("delete-student-confirmation-info", "Jos poistat oppilaan, menetät kaikki oppilaan tiedot sekä arvioinnit.")}
      </CText>
      <SaveAndCancelButtons variant="delete" loading={loading} onSave={deleteStudent} onCancel={onCancel} />
    </>
  );
}

export default function StudentMenu({ route, navigation }: NativeStackScreenProps<HomeStackParams, "student">) {
  const { id, name } = route.params;
  const { t } = useTranslation();

  const { openModal, closeModal } = useModal();
  return (
    <ViewMenuBase>
      <MenuOption
        onSelect={() => {
          openModal({
            title: t("edit-student-name", "Muokkaa oppilaan nimeä"),
            children: (
              <ChangeStudentName
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
        <CText>{t("muokkaa-name", "Muokkaa nimeä")}</CText>
      </MenuOption>
      <MenuOption
        onSelect={() => {
          openModal({
            title: t("delete-student-confirmation-title", "Oletko varma?"),
            children: (
              <DeleteStudent
                studentId={id}
                onCancel={closeModal}
                onDeleted={() => {
                  navigation.goBack();
                  closeModal();
                }}
              />
            ),
          });
        }}
      >
        <CText>{t("delete-student", "Poista oppilas")}</CText>
      </MenuOption>
      <MenuOption onSelect={() => navigation.push("student-feedback", { id, name })}>
        <CText>{t("final-feedback", "Loppuarviointi")}</CText>
      </MenuOption>
    </ViewMenuBase>
  );
}
