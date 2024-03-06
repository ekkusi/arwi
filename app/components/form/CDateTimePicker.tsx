import React from "react";
import { Platform } from "react-native";
import DateTimePicker, { BaseProps } from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import CModal from "../modals/CModal";
import { COLORS } from "../../theme";

type CDateTimePickerProps = BaseProps & {
  isOpen: boolean;
  onClose: () => void;
};

export default function CDateTimePicker({ isOpen, onClose, onChange, ...rest }: CDateTimePickerProps) {
  const { i18n } = useTranslation();

  if (Platform.OS === "ios")
    return (
      // <CModal title={t("select-date", "Valitse päivämäärä")} isOpen={isOpen} onClose={onClose}>
      <CModal closeButton={false} isOpen={isOpen} onClose={onClose}>
        <DateTimePicker
          display="inline"
          locale={i18n.language}
          textColor={COLORS.green}
          accentColor={COLORS.green}
          onChange={(event, newDate) => {
            onClose();
            onChange?.(event, newDate);
          }}
          {...rest}
        />
      </CModal>
    );

  return isOpen ? (
    <DateTimePicker
      onChange={(event, newDate) => {
        onClose();
        onChange?.(event, newDate);
      }}
      {...rest}
    />
  ) : null;
}
