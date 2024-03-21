import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import CText from "../../../../../components/primitives/CText";
import SaveAndCancelButtons from "../../../../../components/ui/SaveAndCancelButtons";
import { graphql } from "@/graphql";
import { getErrorMessage } from "../../../../../helpers/errorUtils";

type ChangeArchiveStatusProps = {
  groupId: string;
  newStatus: boolean;
  text: string;
  onChanged?: () => void;
  onCancel?: () => void;
};

const ChangeArchiveStatus_UpdateGroup_Mutation = graphql(`
  mutation ChangeArchiveStatus_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(groupId: $id, data: $input) {
      id
      archived
    }
  }
`);

export default function ChangeArchiveStatus({ newStatus, text, groupId, onChanged, onCancel }: ChangeArchiveStatusProps) {
  const { t } = useTranslation();
  const [updateGroup, { loading }] = useMutation(ChangeArchiveStatus_UpdateGroup_Mutation, {
    variables: {
      id: groupId,
      input: {
        archived: newStatus,
      },
    },
    onCompleted: onChanged,
    onError: (e) => {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    },
  });

  return (
    <>
      <CText>{text}</CText>
      <SaveAndCancelButtons loading={loading} onSave={updateGroup} onCancel={onCancel} />
    </>
  );
}
