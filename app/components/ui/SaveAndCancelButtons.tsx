import { useTranslation } from "react-i18next";
import CButton, { CButtonProps } from "../primitives/CButton";
import CView, { CViewProps } from "../primitives/CView";

type SaveAndCancelButtonsProps = CViewProps & {
  onCancel?: () => void;
  onSave?: () => void;
  variant?: "default" | "delete";
  loading?: boolean;
  disabled?: boolean;
  cancelButtonProps?: Omit<CButtonProps, "variant" | "shadowed">;
  saveButtonProps?: CButtonProps;
  saveTitle?: string;
  cancelTitle?: string;
};

export default function SaveAndCancelButtons({
  style,
  onCancel,
  onSave,
  loading,
  disabled,
  cancelButtonProps,
  saveButtonProps,
  saveTitle,
  cancelTitle,
  variant = "default",
  ...rest
}: SaveAndCancelButtonsProps) {
  const { t } = useTranslation();

  return (
    <CView style={{ flexDirection: "row", width: "100%", justifyContent: "flex-end", gap: 20, ...style }} {...rest}>
      <CButton
        disabled={loading}
        variant="empty"
        title={cancelTitle || t("cancel", "Peruuta")}
        onPress={onCancel}
        textStyle={{ color: "gray" }}
        {...cancelButtonProps}
      />
      <CButton
        colorScheme={variant === "default" ? "primary" : "error"}
        disabled={disabled}
        loading={loading}
        title={saveTitle || (variant === "default" ? t("save", "Tallenna") : t("delete", "Poista"))}
        onPress={onSave}
        {...saveButtonProps}
      />
    </CView>
  );
}
