import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import CButton from "../../components/primitives/CButton";
import CView from "../../components/primitives/CView";
import SpeechToTextInput from "../../components/form/SpeechToTextInput";

type CustomTextInputViewProps = {
  initialText: string;
  onSave: (text: string, speechObtained: boolean) => void;
};

export default function CustomTextInputView({ initialText, onSave }: CustomTextInputViewProps) {
  const [text, setText] = useState(() => initialText);
  const [speechObtained, setSpeechObtained] = useState(false);
  const { t } = useTranslation();

  const onChange = useCallback((newText: string, newSpeechObtained: boolean) => {
    setText(newText);
    setSpeechObtained(newSpeechObtained);
  }, []);

  return (
    <CView style={{ flex: 1 }}>
      <SpeechToTextInput
        placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
        initialText={initialText}
        onChange={onChange}
        focusOnMount
        microphoneStyle={{
          bottom: 20,
          right: 20,
        }}
      />
      <CView style={{ position: "absolute", left: 20, bottom: 20 }}>
        <CButton
          title={t("save", "Tallenna")}
          onPress={() => {
            onSave(text, speechObtained);
          }}
        />
      </CView>
    </CView>
  );
}
