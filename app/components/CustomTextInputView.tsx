import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import CButton from "./primitives/CButton";
import CView from "./primitives/CView";
import SpeechToTextInput from "./form/SpeechToTextInput";

type CustomTextInputViewProps = {
  initialText: string;
  onSave: (text: string, speechObtained: boolean) => void;
  onClose: () => void;
  isActive: boolean;
};

export default function CustomTextInputView({ initialText, onSave, onClose, isActive }: CustomTextInputViewProps) {
  const [text, setText] = useState(() => initialText);
  const [speechObtained, setSpeechObtained] = useState(false);
  const { t } = useTranslation();

  const onChange = useCallback((newText: string, newSpeechObtained: boolean) => {
    setText(newText);
    setSpeechObtained(newSpeechObtained);
  }, []);

  return (
    <CView style={{ flex: 1, paddingTop: 20 }}>
      <CView style={{ position: "absolute", left: 0, top: -45 }}>
        <CButton
          title={t("save", "Tallenna")}
          onPress={() => {
            onSave(text, speechObtained);
          }}
        />
      </CView>
      <SpeechToTextInput
        placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
        initialText={initialText}
        onChange={onChange}
        onClose={onClose}
        focusOnMount
        isActive={isActive}
        microphoneStyle={{
          bottom: 20,
          right: 20,
        }}
      />
    </CView>
  );
}
