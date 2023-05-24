import { Modal } from "react-native";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView from "./primitives/CView";

export default function SelectionModal({ options, onSelect }: { options: string[]; onSelect: (option: string) => void }) {
  return (
    <Modal transparent visible>
      <CView style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)" }}>
        <CView style={{ width: "80%", height: "80%", backgroundColor: "white", borderRadius: 10 }}>
          {options.map((option, index) => (
            <CTouchableOpacity
              style={{ width: "100%", height: 54, marginLeft: "2xl", borderBottomColor: "darkgray", alignItems: "center" }}
              key={index}
              onPress={() => onSelect(option)}
            >
              <CText style={{ fontSize: "lg", fontWeight: "700", color: "darkgray" }}>{option}</CText>
            </CTouchableOpacity>
          ))}
        </CView>
      </CView>
    </Modal>
  );
}
