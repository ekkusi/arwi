import { Modal, TouchableOpacity } from "react-native";
import { COLORS, FONT_SIZES } from "../theme";
import CText from "./primitives/CText";
import CView from "./primitives/CView";

export default function SelectionModal({ options, onSelect }: { options: string[]; onSelect: (option: string) => void }) {
  return (
    <Modal transparent visible>
      <CView style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)" }}>
        <CView style={{ width: "80%", height: "80%", backgroundColor: COLORS.white, borderRadius: 10 }}>
          {options.map((option, index) => (
            <TouchableOpacity
              style={{ width: "100%", height: 54, marginLeft: 20, borderBottomColor: COLORS.darkgray, alignItems: "center" }}
              key={index}
              onPress={() => onSelect(option)}
            >
              <CText style={{ fontSize: FONT_SIZES.large, fontWeight: "700", color: COLORS.darkgray }}>{option}</CText>
            </TouchableOpacity>
          ))}
        </CView>
      </CView>
    </Modal>
  );
}
