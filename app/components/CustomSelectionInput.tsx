import React, { useState } from "react";
import { FlatList, StyleProp, TextStyle, ViewProps, TouchableOpacity, Modal } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView from "./primitives/CView";

type CustomSelectionInputProps = ViewProps & {
  options: string[];
  title?: string;
  lightTheme?: boolean;
  errorStyle?: StyleProp<TextStyle>;
};

export default function CustomSelectionInput(props: CustomSelectionInputProps) {
  const { options, errorStyle, title, lightTheme = false, ...generalProps } = props;
  const [errorText, setError] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  return (
    <CView style={{ width: "100%" }}>
      {title && <CText style={{ fontSize: "sm", fontWeight: "700", color: COLORS.darkgray }}>{title}</CText>}
      <CTouchableOpacity
        style={{
          width: "100%",
          borderColor: "gray",
          borderBottomWidth: 1,
          height: 54,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setSelectModalOpen(true)}
      >
        <CText style={{ fontSize: "lg", fontWeight: "700", color: selected ? COLORS.darkgray : COLORS.lightgray }}>
          {selected || "Valitse luokka"}
        </CText>
        <MaterialCommunityIcon name="chevron-down" color={COLORS.darkgray} size={30} />
      </CTouchableOpacity>
      {errorText && <CText style={{ color: "error", fontWeight: "600", fontSize: "sm" }}>{errorText}</CText>}
      {selectModalOpen && (
        <Modal transparent visible onRequestClose={() => setSelectModalOpen(false)}>
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
              <CText style={{ width: "100%", fontSize: "title", color: "darkgray" }}>{title}</CText>
              <FlatList
                renderItem={({ item }: { item: string }) => (
                  <CTouchableOpacity
                    style={{
                      width: "80%",
                      height: 54,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setSelected(item);
                      setSelectModalOpen(false);
                    }}
                  >
                    <CText style={{ fontSize: "lg", fontWeight: "700", color: "darkgray" }}>{item}</CText>
                  </CTouchableOpacity>
                )}
                data={options}
                keyExtractor={(item, index) => index.toString()}
              />
            </CView>
          </CView>
        </Modal>
      )}
    </CView>
  );
}
