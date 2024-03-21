import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CButton from "../primitives/CButton";
import CView, { CViewProps } from "../primitives/CView";

type ParticipationToggleProps = Omit<CViewProps, "onChange"> & {
  disabled?: boolean;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
};

export default function ParticipationToggle({ disabled, initialValue = true, onChange, ...rest }: ParticipationToggleProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);

  const toggle = (newValue: boolean) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <CView {...rest}>
      <CButton
        disabled={disabled}
        title={t("present", "Paikalla")}
        style={{ marginRight: "sm", borderRadius: 10 }}
        variant={value ? "filled" : "outline"}
        onPress={() => toggle(true)}
      />
      <CButton
        disabled={disabled}
        title={t("notPresent", "Poissa")}
        colorScheme="error"
        style={{ borderRadius: 10 }}
        variant={value ? "outline" : "filled"}
        onPress={() => toggle(false)}
      />
    </CView>
  );
}
