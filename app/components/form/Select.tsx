import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, TouchableWithoutFeedback } from "react-native";
import Animated, { FadeIn, FadeOut, runOnJS, SlideInDown, SlideOutDown } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "../../theme";
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
  const [modalChildrenVisible, setModalChildrenVisible] = useState(false);

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
    if (closeAfterSelect) toggleModal(false);
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

  const toggleModal = (value: boolean) => {
    if (value) {
      setModalChildrenVisible(true);
      setSelectModalOpen(true);
    } else {
      setModalChildrenVisible(false); // Only remove the children on exit and let animation exit callback close the whole modal
    }
  };

  const closeModal = () => {
    setSelectModalOpen(false);
  };

  // Set this as exit animation so that the modal closes after the animation is done. If not done the exit animation is not run and modal gets stuck
  const slideOutExit = SlideOutDown.withCallback((finished) => {
    "worklet";

    if (finished) {
      runOnJS(closeModal)();
    }
  });

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
        onPress={() => toggleModal(true)}
      >
        {typeof selectedLabel !== "string" ? (
          selectedLabel
        ) : (
          <CText style={{ flex: 1, fontWeight: "300", color: selected ? COLORS.darkgray : COLORS.lightgray }}>{selectedLabel}</CText>
        )}
        <MaterialCommunityIcon name="chevron-down" color={COLORS.darkgray} size={30} />
      </CTouchableOpacity>
      {selectModalOpen && (
        <Modal transparent visible onRequestClose={() => toggleModal(false)}>
          {modalChildrenVisible && (
            <TouchableWithoutFeedback onPress={() => toggleModal(false)}>
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableWithoutFeedback>
                  <Animated.View
                    entering={SlideInDown}
                    exiting={slideOutExit}
                    onLayout={(event) => event.type}
                    style={{
                      width: "100%",
                      maxHeight: "80%",
                      paddingHorizontal: SPACING.xl,
                      paddingTop: SPACING.md,
                      backgroundColor: COLORS.white,
                      borderRadius: 20,
                      alignItems: "center",
                    }}
                  >
                    <CView style={{ width: "100%", flexDirection: "row", alignItems: "center", marginBottom: "lg" }}>
                      {title && <CText style={{ flex: 1, color: "darkgray", fontWeight: "bold" }}>{title}</CText>}
                      <CButton variant="empty" style={{}} onPress={() => toggleModal(false)}>
                        {isMulti ? (
                          <CText style={{ color: "primary", fontWeight: "bold" }}>{t("done", "Valmis")}</CText>
                        ) : (
                          <MaterialCommunityIcon name="close" size={25} />
                        )}
                      </CButton>
                    </CView>
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
                              // backgroundColor: "rgba(0, 0, 0, 0.05)",
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
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </TouchableWithoutFeedback>
          )}
        </Modal>
      )}
    </>
  );
}
