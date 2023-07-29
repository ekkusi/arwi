import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextFormField from "../../components/form/TextFormField";
import CButton from "../../components/primitives/CButton";
import CView from "../../components/primitives/CView";
import { graphql } from "../../gql";
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
  const [newGroupName, setNewGroupName] = useState<string>(name);
  const [error, setError] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const [updateGroup, { loading }] = useMutation(ChangeGroupName_UpdateGroup_Mutation);

  const onNameChange = (text: string) => {
    setNewGroupName(text);
    setError(undefined);
  };

  const save = async () => {
    if (newGroupName.length === 0) {
      setError(t("name-cannot-be-empty", "Nimi ei voi olla tyhjä"));
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
      setError(getErrorMessage(e));
    }
  };

  return (
    <CView style={{ width: "100%", paddingBottom: "lg" }}>
      <TextFormField
        value={newGroupName}
        placeholder={t("new-name", "Uusi nimi")}
        error={error}
        title={t("new-name", "Uusi nimi")}
        onChange={onNameChange}
        style={{ marginBottom: "2xl" }}
      />
      <CView style={{ flexDirection: "row", justifyContent: "flex-end", gap: 20 }}>
        <CButton variant="empty" title={t("cancel", "Peruuta")} onPress={onCancel} textStyle={{ color: "gray" }} />
        <CButton disabled={!!error} loading={loading} title={t("save", "Tallenna")} onPress={save} />
      </CView>
    </CView>
  );
}
