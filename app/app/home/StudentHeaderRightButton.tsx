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
import ChangeStudentName from "./ChangeStudentName";
import { getErrorMessage } from "../../helpers/errorUtils";
import SaveAndCancelButtons from "../../components/SaveAndCancelButtons";

const StudentHeaderRightButton_DeleteStudent_Mutation = graphql(`
  mutation StudentHeaderRightButton_DeleteStudent($id: ID!) {
    deleteStudent(studentId: $id) {
      id
      name
      group {
        id
        name
        archived
        updatedAt
        subject {
          label
          code
        }
        currentClassYear {
          id
          info {
            code
            label
          }
          students {
            id
            name
            currentClassEvaluations {
              id
              wasPresent
            }
          }
          evaluationCollections {
            id
            date
            environment {
              label
              code
              color
            }
            learningObjectives {
              code
              label
              description
              type
            }
          }
        }
      }
    }
  }
`);

function DeleteStudent({ studentId, onDeleted, onCancel }: { studentId: string; onDeleted: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [deleteStudent, { loading }] = useMutation(StudentHeaderRightButton_DeleteStudent_Mutation, {
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

export default function StudentHeaderRightButton({
  id,
  name,
  navigation,
}: {
  id: string;
  name: string;
  navigation: NativeStackNavigationProp<HomeStackParams, "student">;
}) {
  const { t } = useTranslation();

  const { openModal, closeModal } = useModal();
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
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
        </CView>
      </MenuOptions>
    </Menu>
  );
}
