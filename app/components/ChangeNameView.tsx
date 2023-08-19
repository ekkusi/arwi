import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextFormField from "./form/TextFormField";
import CButton from "./primitives/CButton";
import CView from "./primitives/CView";

type ChangeNameViewProps = {
  name: string;
  onCancel?: () => void;
  loading?: boolean;
  onSaved: (newName: string) => void;
};

export default function ChangeNameView({ name, onCancel, loading = false, onSaved }: ChangeNameViewProps) {
  const [newName, setNewName] = useState<string>(name);
  const [error, setError] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const onNameChange = (text: string) => {
    setNewName(text);
    setError(undefined);
  };

  return (
    <CView style={{ width: "100%", paddingBottom: "lg" }}>
      <TextFormField value={newName} placeholder={t("new-name", "Uusi nimi")} error={error} onChange={onNameChange} style={{ marginBottom: "2xl" }} />
      <CView style={{ flexDirection: "row", justifyContent: "flex-end", gap: 20 }}>
        <CButton variant="empty" title={t("cancel", "Peruuta")} onPress={onCancel} textStyle={{ color: "gray" }} />
        <CButton disabled={!!error} loading={loading} title={t("save", "Tallenna")} onPress={() => onSaved(newName)} />
      </CView>
    </CView>
  );
}
