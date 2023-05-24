import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  ViewProps,
  TouchableOpacity,
  Modal,
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONT_SIZES } from "../theme";
import CText from "./primitives/CText";
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

  const allStyles = errorText
    ? [styles.regularInputStyle, generalProps.style, styles.errorInputStyle, errorStyle]
    : [styles.regularInputStyle, generalProps.style];
  const textStyles: StyleProp<TextStyle>[] = [styles.titleStyle];
  if (lightTheme) {
    textStyles.push({ color: COLORS.white });
    allStyles.push({ borderColor: COLORS.white });
  }
  return (
    <View style={{ width: "100%" }}>
      {title && <Text style={textStyles}>{title}</Text>}
      <TouchableOpacity
        style={{
          width: "100%",
          borderColor: COLORS.gray,
          borderBottomWidth: 1,
          height: 54,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setSelectModalOpen(true)}
      >
        <Text style={{ fontSize: FONT_SIZES.large, fontWeight: "700", color: selected ? COLORS.darkgray : COLORS.lightgray }}>
          {selected || "Valitse luokka"}
        </Text>
        <MaterialCommunityIcon name="chevron-down" color={COLORS.darkgray} size={30} />
      </TouchableOpacity>
      {errorText && <Text style={{ color: COLORS.error, fontWeight: "600", fontSize: FONT_SIZES.small }}>{errorText}</Text>}
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
            <CView style={{ width: "80%", height: "80%", backgroundColor: COLORS.white, borderRadius: 10, alignItems: "center" }}>
              {options.map((option, index) => (
                <TouchableOpacity
                  style={{
                    width: "80%",
                    height: 54,
                    borderBottomColor: COLORS.darkgray,
                    borderBottomWidth: 1,
                    justifyContent: "center",
                  }}
                  key={index}
                  onPress={() => {
                    setSelected(option);
                    setSelectModalOpen(false);
                  }}
                >
                  <CText style={{ fontSize: FONT_SIZES.large, fontWeight: "700", color: COLORS.darkgray }}>{option}</CText>
                </TouchableOpacity>
              ))}
            </CView>
          </CView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: COLORS.darkgray,
    borderColor: COLORS.gray,
    height: 54,
    width: "100%",
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
  },
  titleStyle: {
    fontSize: FONT_SIZES.small,
    fontWeight: "700",
    color: COLORS.darkgray,
  },
  errorInputStyle: {
    borderBottomWidth: 2,
    borderColor: COLORS.error,
  },
});
