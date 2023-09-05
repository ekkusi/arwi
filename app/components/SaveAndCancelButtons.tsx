import { useTranslation } from "react-i18next";
import CButton, { CButtonProps } from "./primitives/CButton";
import CView, { CViewProps } from "./primitives/CView";

type SaveAndCancelButtonsProps = CViewProps & {
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
  disabled?: boolean;
  cancelButtonProps?: Omit<CButtonProps, "variant" | "shadowed">;
  saveButtonProps?: CButtonProps;
};

export default function SaveAndCancelButtons({
  style,
  onCancel,
  onSave,
  loading,
  disabled,
  cancelButtonProps,
  saveButtonProps,
  ...rest
}: SaveAndCancelButtonsProps) {
  const { t } = useTranslation();
  return (
    <CView style={{ flexDirection: "row", justifyContent: "flex-end", gap: 20, ...style }} {...rest}>
      <CButton
        disabled={loading}
        variant="empty"
        title={t("cancel", "Peruuta")}
        onPress={onCancel}
        textStyle={{ color: "gray" }}
        {...cancelButtonProps}
      />
      <CButton disabled={disabled} loading={loading} title={t("save", "Tallenna")} onPress={onSave} {...saveButtonProps} />
    </CView>
  );
}
