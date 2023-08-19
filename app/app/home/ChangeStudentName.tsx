import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import ChangeNameView from "../../components/ChangeNameView";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";

const ChangeStudentName_UpdateStudent_Mutation = graphql(`
  mutation ChangeStudentName_UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
    updateStudent(studentId: $id, data: $input) {
      id
      name
    }
  }
`);

type ChangeStudentNameProps = {
  id: string;
  name: string;
  onCancel?: () => void;
  onSaved?: (newName: string) => void;
};

export default function ChangeStudentName({ id, name, onCancel, onSaved }: ChangeStudentNameProps) {
  const { t } = useTranslation();

  const [updateStudent, { loading }] = useMutation(ChangeStudentName_UpdateStudent_Mutation);

  const save = async (newName: string) => {
    if (newName.length === 0) {
      Alert.alert(t("name-cannot-be-empty", "Nimi ei voi olla tyhjä"));
      return;
    }

    try {
      await updateStudent({
        variables: {
          id,
          input: {
            name: newName,
          },
        },
      });
      onSaved?.(newName);
    } catch (e) {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    }
  };

  return <ChangeNameView name={name} onCancel={onCancel} onSaved={save} loading={loading} />;
}
