import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../theme";
import CText from "../primitives/CText";
import CTouchableOpacity from "../primitives/CTouchableOpacity";
import CView from "../primitives/CView";

export type OptionType = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: OptionType[];
  error?: boolean;
  placeholder?: string;
  onSelect?: (value: OptionType) => void;
};

export default function Select(props: SelectProps) {
  const { t } = useTranslation();
  const { options, error, onSelect, placeholder = t("components.Select.defaultPlaceholder", "Valitse") } = props;
  const [selected, setSelected] = useState<OptionType | undefined>(undefined);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <>
      <CTouchableOpacity
        style={{
          width: "100%",
          borderColor: error ? "error" : "gray",
          borderBottomWidth: 1,
          height: 54,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setSelectModalOpen(true)}
      >
        <CText style={{ fontWeight: "300", color: selected ? COLORS.darkgray : COLORS.lightgray }}>{selected ? selected.label : placeholder}</CText>
        <MaterialCommunityIcon name="chevron-down" color={COLORS.darkgray} size={30} />
      </CTouchableOpacity>
      {selectModalOpen && (
        <Modal transparent visible onRequestClose={() => setSelectModalOpen(false)}>
          <TouchableWithoutFeedback onPress={() => setSelectModalOpen(false)}>
            <CView
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CView style={{ width: "80%", height: "80%", backgroundColor: "white", borderRadius: 20, alignItems: "center" }}>
                {/* <CText style={{ width: "100%", fontSize: "title", color: "darkgray" }}>{title}</CText> */}
                <FlatList
                  style={{ width: "90%" }}
                  showsVerticalScrollIndicator={false}
                  disableScrollViewPanResponder
                  renderItem={({ item }) => (
                    <CTouchableOpacity
                      style={{
                        marginHorizontal: 5,
                        height: 54,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        justifyContent: "center",
                        width: "90%",
                      }}
                      onPress={() => {
                        setSelected(item);
                        if (onSelect) onSelect(item);
                        setSelectModalOpen(false);
                      }}
                    >
                      <CText style={{ fontSize: "lg", fontWeight: "400", color: "darkgray", width: "100%" }}>{item.label}</CText>
                    </CTouchableOpacity>
                  )}
                  data={options}
                  keyExtractor={(item, index) => index.toString()}
                />
              </CView>
            </CView>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
}
