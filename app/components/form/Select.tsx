import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../../theme";
import CModal from "../CModal";
import CButton from "../primitives/CButton";
import CFlatList from "../primitives/CFlatList";
import CText from "../primitives/CText";
import CTouchableOpacity from "../primitives/CTouchableOpacity";
import CView from "../primitives/CView";

export type OptionType = {
  value: string;
  label: string;
};

type DynamicSelectProps<CustomOptionType = unknown, IsMulti = boolean> = IsMulti extends true
  ? {
      onSelect: (value: CustomOptionType[]) => void;
      isMulti: IsMulti;
      defaultValue?: CustomOptionType[];
    }
  : {
      onSelect: (value: CustomOptionType) => void;
      isMulti: IsMulti;
      defaultValue?: CustomOptionType;
    };

export type SelectProps<CustomOptionType = unknown, IsMulti = boolean> = {
  getOptionValue: (item: CustomOptionType) => string;
  formatLabel: (item: CustomOptionType) => string;
  options: CustomOptionType[];
  error?: boolean;
  placeholder?: string;
  closeAfterSelect?: boolean;
  title?: string;
} & DynamicSelectProps<CustomOptionType, IsMulti>;

export default function Select<CustomOptionType = unknown>(props: SelectProps<CustomOptionType>) {
  const { t } = useTranslation();
  const {
    options,
    error,
    onSelect: _onSelect,
    isMulti,
    closeAfterSelect = !isMulti,
    title,
    defaultValue,
    formatLabel,
    getOptionValue,
    placeholder = t("select-default-placeholder", "Valitse"),
  } = props;

  const selectedDefaults = useMemo(() => {
    if (isMulti) {
      return defaultValue || [];
    }
    return defaultValue ? [defaultValue] : [];
  }, [defaultValue, isMulti]);
  const [selected, setSelected] = useState<CustomOptionType[]>(selectedDefaults);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  const onSelect = (value: CustomOptionType) => {
    if (isMulti) {
      let newSelected;
      if (selected.find((s) => getOptionValue(s) === getOptionValue(value))) {
        newSelected = selected.filter((s) => getOptionValue(s) !== getOptionValue(value));
      } else {
        newSelected = [...selected, value];
      }
      setSelected(newSelected);
      _onSelect?.(newSelected);
    } else {
      setSelected([value]);
      _onSelect?.(value);
    }
    if (closeAfterSelect) setSelectModalOpen(false);
  };

  const selectedLabel = useMemo(() => {
    if (selected.length === 0) return placeholder;
    if (isMulti) {
      return (
        <CView style={{ flexDirection: "row", flexWrap: "wrap", gap: "xs", flex: 1 }}>
          {selected.map((it) => (
            <CText
              key={getOptionValue(it)}
              style={{
                paddingVertical: "xs",
                paddingHorizontal: "lg",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
                backgroundColor: "white",
                fontSize: "sm",
              }}
            >
              {getOptionValue(it)}
            </CText>
          ))}
        </CView>
      );
    }
    return formatLabel(selected[0]);
  }, [formatLabel, getOptionValue, isMulti, placeholder, selected]);

  return (
    <>
      <CTouchableOpacity
        style={{
          width: "100%",
          borderColor: error ? "error" : "gray",
          borderBottomWidth: 1,
          paddingVertical: SPACING.md,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setSelectModalOpen(true)}
      >
        {typeof selectedLabel !== "string" ? (
          selectedLabel
        ) : (
          <CText style={{ flex: 1, fontWeight: "300", color: selected ? COLORS.darkgray : COLORS.lightgray }}>{selectedLabel}</CText>
        )}
        <MaterialCommunityIcon name="chevron-down" color={COLORS.darkgray} size={30} />
      </CTouchableOpacity>
      <CModal
        isOpen={selectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        placement="bottom"
        title={title}
        innerViewStyles={{ paddingBottom: 0 }}
        closeButton={
          <CButton variant="empty" onPress={() => setSelectModalOpen(false)}>
            {isMulti ? (
              <CText style={{ color: "primary", fontWeight: "bold" }}>{t("done", "Valmis")}</CText>
            ) : (
              <MaterialCommunityIcon name="close" size={25} />
            )}
          </CButton>
        }
      >
        <CFlatList
          style={{ width: "100%", paddingTop: "md" }}
          renderItem={({ item, index }) => {
            const isSelected = selected.findIndex((s) => getOptionValue(s) === getOptionValue(item)) >= 0;
            return (
              <CView key={getOptionValue(item)} onStartShouldSetResponder={() => true}>
                <CTouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: "md",
                    backgroundColor: "extra-light-gray",
                    paddingHorizontal: "lg",
                    borderRadius: 10,
                    marginBottom: index === options.length - 1 ? "2xl" : "md",
                  }}
                  onPress={() => {
                    onSelect(item);
                  }}
                >
                  <CText
                    style={{
                      flex: 1,
                      fontWeight: "400",
                      color: isSelected ? "primary" : "darkgray",
                      width: "100%",
                      marginRight: isSelected ? 10 : 30,
                    }}
                  >
                    {formatLabel(item)}
                  </CText>
                  {isSelected && <MaterialCommunityIcon name="check" size={23} color={COLORS.primary} />}
                </CTouchableOpacity>
              </CView>
            );
          }}
          data={options}
        />
      </CModal>
    </>
  );
}
