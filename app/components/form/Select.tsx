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

type DynamicSelectProps<IsMulti = boolean> = IsMulti extends true
  ? {
      onSelect: (value: OptionType[]) => void;
      isMulti: IsMulti;
    }
  : {
      onSelect: (value: OptionType) => void;
      isMulti: IsMulti;
    };

export type SelectProps<IsMulti = boolean> = {
  options: OptionType[];
  error?: boolean;
  placeholder?: string;
  closeAfterSelect?: boolean;
  title?: string;
} & DynamicSelectProps<IsMulti>;

export default function Select(props: SelectProps) {
  const { t } = useTranslation();
  const {
    options,
    error,
    onSelect: _onSelect,
    isMulti,
    closeAfterSelect = !isMulti,
    title,
    placeholder = t("select-default-placeholder", "Valitse"),
  } = props;
  const [selected, setSelected] = useState<OptionType[]>([]);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  const onSelect = (value: OptionType) => {
    if (isMulti) {
      let newSelected;
      if (selected.find((s) => s.value === value.value)) {
        newSelected = selected.filter((s) => s.value !== value.value);
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
              key={it.value}
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
              {it.value}
            </CText>
          ))}
        </CView>
      );
    }
    return selected[0].label;
  }, [isMulti, placeholder, selected]);

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
            const isSelected = selected.findIndex((s) => s.value === item.value) >= 0;
            return (
              <CTouchableOpacity
                key={item.value}
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
                  {item.label}
                </CText>
                {isSelected && <MaterialCommunityIcon name="check" size={23} color={COLORS.primary} />}
              </CTouchableOpacity>
            );
          }}
          data={options}
        />
      </CModal>
    </>
  );
}
