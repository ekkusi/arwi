import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import ChangeNameView from "../../components/ChangeNameView";
import { graphql } from "@/graphql";
import { getErrorMessage } from "../../helpers/errorUtils";

const AddNewStudent_CreateStudent_Mutation = graphql(`
  mutation AddNewStudent_CreateStudent($id: ID!, $input: CreateStudentInput!) {
    createStudent(moduleId: $id, data: $input) {
      id
      group {
        id
        currentModule {
          id
          students {
            id
          }
        }
      }
    }
  }
`);

type AddNewStudentProps = {
  classYearId: string;
  onCancel?: () => void;
  onSaved?: () => void;
};

export default function AddNewStudent({ classYearId, onCancel, onSaved }: AddNewStudentProps) {
  const { t } = useTranslation();

  const [createStudent, { loading }] = useMutation(AddNewStudent_CreateStudent_Mutation);

  const save = async (newName: string) => {
    if (newName.length === 0) {
      Alert.alert(t("name-cannot-be-empty", "Nimi ei voi olla tyhjä"));
      return;
    }

    try {
      await createStudent({
        variables: {
          id: classYearId,
          input: {
            name: newName,
          },
        },
      });
      onSaved?.();
    } catch (e) {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    }
  };

  return <ChangeNameView name="" onSaved={save} onCancel={onCancel} loading={loading} />;
}
