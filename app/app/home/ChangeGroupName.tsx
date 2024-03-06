import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import ChangeNameView from "../../components/ChangeNameView";
import { graphql } from "@/graphql";
import { getErrorMessage } from "../../helpers/errorUtils";

const ChangeGroupName_UpdateGroup_Mutation = graphql(`
  mutation ChangeGroupName_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(groupId: $id, data: $input) {
      id
      name
    }
  }
`);

type ChangeGroupNameProps = {
  id: string;
  name: string;
  onCancel?: () => void;
  onSaved?: (newName: string) => void;
};

export default function ChangeGroupName({ id, name, onCancel, onSaved }: ChangeGroupNameProps) {
  const { t } = useTranslation();

  const [updateGroup, { loading }] = useMutation(ChangeGroupName_UpdateGroup_Mutation);

  const save = async (newGroupName: string) => {
    if (newGroupName.length === 0) {
      Alert.alert(t("name-cannot-be-empty", "Nimi ei voi olla tyhjä"));
      return;
    }

    try {
      await updateGroup({
        variables: {
          id,
          input: {
            name: newGroupName,
          },
        },
      });
      onSaved?.(newGroupName);
    } catch (e) {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    }
  };

  return <ChangeNameView name={name} onSaved={save} onCancel={onCancel} loading={loading} />;
}
