/* eslint-disable react/destructuring-assignment */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasNotch } from "react-native-device-info";
import CButton from "../primitives/CButton";
import CView from "../primitives/CView";
import SpeechToTextInput, { SpeechToTextInputHandle, SpeechToTextInputProps } from "./SpeechToTextInput";
import CModal from "../modals/CModal";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import CTouchableWithoutFeedback from "../primitives/CTouchableWithoutFeedback";
import { CTextStyle, CViewStyle } from "@/theme/types";

type CommonProps = {
  initialText?: string;
  onClose?: () => void;
  containerStyle?: CViewStyle;
  style?: CTextStyle;
};

type WithSpeechRecognitionProps = CommonProps & {
  hasSpeechRecognition: true;
  onSave?: (text: string, speechObtained: boolean) => void;
  onChangedOutsideModal?: (text: string, speechObtained: boolean) => void;
  isActive: boolean;
};

type WithoutSpeechRecognitionProps = CommonProps & {
  hasSpeechRecognition?: false;
  initialText?: string;
  onSave?: (text: string) => void;
  onClose?: () => void;
};

function hasSpeechRecognition(props: WithSpeechRecognitionProps | WithoutSpeechRecognitionProps): props is WithSpeechRecognitionProps {
  return props.hasSpeechRecognition === true;
}

export default function ModalTextInput(props: WithSpeechRecognitionProps | WithoutSpeechRecognitionProps) {
  const { initialText, onSave, onClose } = props;
  const [text, setText] = useState(initialText || "");
  const [modalText, setModalText] = useState(initialText || "");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [speechObtained, setSpeechObtained] = useState(false);
  const { t } = useTranslation();

  const speechRef = useRef<SpeechToTextInputHandle>(null);

  const onSpeechInputChanged = useCallback((newText: string, newSpeechObtained: boolean) => {
    setModalText(newText);
    setSpeechObtained(newSpeechObtained);
  }, []);

  const onSpeechInputChangedOutsideModal = useCallback(
    (newText: string, newSpeechObtained: boolean) => {
      onSpeechInputChanged(newText, newSpeechObtained);
      setText(newText);
      if (hasSpeechRecognition(props)) {
        props.onChangedOutsideModal?.(newText, newSpeechObtained);
      }
    },
    [onSpeechInputChanged, props]
  );

  const closeModal = (isSave = false) => {
    if (speechRef.current) {
      speechRef.current.refreshVoiceListeners();
    }
    setIsEditModalOpen(false);
    onClose?.();

    if (!isSave && modalText !== text) {
      setModalText(text);
    }
  };

  const openModal = () => {
    if (speechRef.current) {
      speechRef.current.removeVoiceListeners().then(() => {
        setIsEditModalOpen(true);
      });
    } else {
      setIsEditModalOpen(true);
    }
  };

  const save = () => {
    setText(modalText);
    onSave?.(text, speechObtained);
    closeModal(true);
  };

  const commonInputProps = useMemo(
    () => ({
      placeholder: t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla..."),
      style: {
        flex: 1,
        ...props.style,
      },
    }),
    [props.style, t]
  );

  const getCommonSpeechInputProps = (inputProps: WithSpeechRecognitionProps): SpeechToTextInputProps => ({
    onClose,
    isActive: inputProps.isActive,
    ...commonInputProps,
  });

  const getCommonTextInputProps = (): CTextInputProps => ({
    as: "textarea",
    ...commonInputProps,
  });

  // Overwrite text when initialText changes
  useEffect(() => {
    if (!initialText) return;

    if (initialText !== text) {
      setText(initialText);
      setModalText(initialText);
    }

    // Only run this when initialText prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialText]);

  return (
    <>
      <CModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        placement="bottom"
        innerViewStyles={{ maxHeight: "100%", flex: 1, paddingTop: hasNotch() ? 60 : 50 }}
      >
        <CView style={{ flex: 1, paddingTop: 20 }}>
          <CView style={{ position: "absolute", left: 0, top: -45 }}>
            <CButton title={t("save", "Tallenna")} onPress={save} />
          </CView>
          {/* {renderInput()} */}
          {hasSpeechRecognition(props) ? (
            <SpeechToTextInput initialText={modalText} onChange={onSpeechInputChanged} {...getCommonSpeechInputProps(props)} />
          ) : (
            <CTextInput value={modalText} onChangeText={setModalText} {...commonInputProps} {...getCommonTextInputProps()} />
          )}
        </CView>
      </CModal>
      {hasSpeechRecognition(props) ? (
        <SpeechToTextInput
          initialText={text}
          ref={speechRef}
          onChange={onSpeechInputChangedOutsideModal}
          onPress={openModal}
          containerStyle={props.containerStyle}
          {...getCommonSpeechInputProps(props)}
        />
      ) : (
        <CTouchableWithoutFeedback onPress={openModal} style={props.containerStyle}>
          <CTextInput value={text} {...getCommonTextInputProps()} />
        </CTouchableWithoutFeedback>
      )}
    </>
  );
}
