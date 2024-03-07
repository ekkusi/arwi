/* eslint-disable react/destructuring-assignment */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasNotch } from "react-native-device-info";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { WarningInfo } from "arwi-backend/src/types";
import CButton from "../primitives/CButton";
import CView from "../primitives/CView";
import SpeechToTextInput, { SpeechToTextInputHandle, SpeechToTextInputProps } from "./SpeechToTextInput";
import CModal from "../modals/CModal";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import CTouchableWithoutFeedback from "../primitives/CTouchableWithoutFeedback";
import { CViewStyle } from "@/theme/types";
import { graphql } from "@/graphql";
import { useToast } from "@/hooks-and-providers/ToastProvider";
import { useToggleTokenUseWarning } from "@/hooks-and-providers/monthlyTokenUseWarning";
import CKeyboardAvoidingView from "../layout/CKeyboardAvoidingView";
import LoadingIndicator from "../ui/LoadingIndicator";

type ExtraInputProps = Omit<CTextInputProps, "onChange" | "onChangeText" | "value">;

type CommonProps = ExtraInputProps & {
  initialValue?: string;
  onClose?: () => void;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  isLoading?: boolean;
  containerStyle?: CViewStyle;
  innerInputProps?: ExtraInputProps;
  modalInputProps?: ExtraInputProps;
};

type WithSpeechRecognitionProps = CommonProps & {
  hasSpeechRecognition: true;
  hasTextFix?: boolean;
  onChangeOutsideModal?: (value: string) => void;
  onTextFixed?: (value: string) => void;
  textFixSuccessMessage?: string;
  isActive: boolean;
};

type WithoutSpeechRecognitionProps = CommonProps & {
  hasSpeechRecognition?: false;
  hasTextFix?: never;
  isActive?: never;
  onChangeOutsideModal?: never;
  onTextFixed?: never;
  textFixSuccessMessage?: never;
};

const ModalTextInput_FixTextGrammatics_Mutation = graphql(`
  mutation ModalTextInput_FixTextGrammatics($text: String!) {
    fixTextGrammatics(text: $text) {
      result
      usageData {
        id
        monthlyTokensUsed
        warning {
          warning
          threshhold
        }
      }
    }
  }
`);

const TEXT_MIN_LENGTH_FOR_AI_FIX = 20;

function hasSpeechRecognition(props: WithSpeechRecognitionProps | WithoutSpeechRecognitionProps): props is WithSpeechRecognitionProps {
  return props.hasSpeechRecognition === true;
}

export default function ModalTextInput(props: WithSpeechRecognitionProps | WithoutSpeechRecognitionProps) {
  const { initialValue, onSave, onClose, onChange, isDisabled: _isDisabled, modalInputProps, innerInputProps, isLoading: _isLoading } = props;
  // Default to true if not defined
  const hasTextFix = hasSpeechRecognition(props) && props.hasTextFix != null ? props.hasTextFix : true;
  const textFixSuccessMessage = hasSpeechRecognition(props) ? props.textFixSuccessMessage : undefined;

  const [valueBeforeTextFix, setValueBeforeTextFix] = useState<string>();
  const [value, setValue] = useState(initialValue || "");
  const [modalValue, setModalValue] = useState(initialValue || "");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [speechObtained, setSpeechObtained] = useState(false);
  const { t } = useTranslation();

  const speechRef = useRef<SpeechToTextInputHandle>(null);
  const modalSpeechRef = useRef<SpeechToTextInputHandle>(null);

  const { openToast } = useToast();
  const toggleTokenUseWarning = useToggleTokenUseWarning();
  const [fixTextGrammatics, { loading: isFixingText }] = useMutation(ModalTextInput_FixTextGrammatics_Mutation);

  const isLoading = _isLoading || isFixingText;
  const isDisabled = _isDisabled || isLoading;

  const onSpeechInputChanged = useCallback(
    (newValue: string, newSpeechObtained: boolean) => {
      setModalValue(newValue);
      if (!speechObtained && newSpeechObtained) setSpeechObtained(newSpeechObtained);
    },
    [speechObtained]
  );

  const changeValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setModalValue(newValue);
      if (valueBeforeTextFix && valueBeforeTextFix !== newValue) setValueBeforeTextFix(undefined);
      onChange?.(newValue);
    },
    [onChange, valueBeforeTextFix]
  );

  const onSpeechInputChangedOutsideModal = useCallback(
    (newValue: string, newSpeechObtained: boolean) => {
      onSpeechInputChanged(newValue, newSpeechObtained);
      changeValue(newValue);
      if (hasSpeechRecognition(props)) {
        props.onChangeOutsideModal?.(newValue);
      }
    },
    [changeValue, onSpeechInputChanged, props]
  );

  const closeModal = (isSave: boolean) => {
    if (speechRef.current) {
      speechRef.current.refreshVoiceListeners();
    }
    setIsEditModalOpen(false);
    onClose?.();

    // If not a save, reset modal value
    if (!isSave && modalValue !== value) {
      setModalValue(value);
    }
  };

  const openModal = () => {
    // If speech recognition is active, we need to remove the listeners from the outer speech recognition component before opening the modal
    if (speechRef.current) {
      speechRef.current.removeVoiceListeners().then(() => {
        setIsEditModalOpen(true);
      });
    } else {
      setIsEditModalOpen(true);
    }
  };

  const save = () => {
    changeValue(modalValue);
    onSave?.(value);
    closeModal(true);
  };

  const resetSpeechObtained = () => {
    setSpeechObtained(false);
    speechRef.current?.setSpeechObtained(false);
    modalSpeechRef.current?.setSpeechObtained(false);
  };

  const commonInputProps = useMemo(
    () => ({
      placeholder: t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla..."),
      isDisabled,
    }),
    [isDisabled, t]
  );

  const commonModalInputProps = useMemo(
    () => ({
      ...modalInputProps,
      style: { flex: 1, ...props.style, ...modalInputProps?.style },
    }),
    [modalInputProps, props.style]
  );

  const commonInnerInputProps = useMemo(
    () => ({
      ...innerInputProps,
      style: { ...props.style, ...innerInputProps?.style },
    }),
    [innerInputProps, props.style]
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

  const fixText = async () => {
    try {
      const result = await fixTextGrammatics({
        variables: {
          text: value,
        },
      });

      if (!result.data?.fixTextGrammatics) throw new Error("Text rephrasing failed");
      setValueBeforeTextFix(value);
      const resultText = result.data?.fixTextGrammatics.result;
      changeValue(resultText);
      resetSpeechObtained();
      openToast(textFixSuccessMessage || t("ai-text-fix-completed-message", "Tekstin korjaus suoritettu."));

      const tokenUseWarning = result.data?.fixTextGrammatics.usageData.warning;
      if (tokenUseWarning) toggleTokenUseWarning(tokenUseWarning as WarningInfo);
    } catch (e) {
      console.error(e);
      Alert.alert(t("text-fix-error", "Tekstin korjaamisessa tapahtui virhe."));
    }
  };

  const rollbackTextFix = () => {
    if (valueBeforeTextFix) {
      setValue(valueBeforeTextFix);
      setModalValue(valueBeforeTextFix);
      setValueBeforeTextFix(undefined);
    }
  };

  const textFixAvailable = value.length >= TEXT_MIN_LENGTH_FOR_AI_FIX && speechObtained;

  // Overwrite value when initialValue changes
  useEffect(() => {
    if (!initialValue) return;

    if (initialValue !== value) {
      setValue(initialValue);
      setModalValue(initialValue);
    }

    // Only run this when initialValue prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return (
    <>
      <CModal
        isOpen={isEditModalOpen}
        onClose={() => closeModal(false)}
        placement="bottom"
        innerViewStyles={{ maxHeight: "100%", flex: 1, paddingTop: hasNotch() ? 60 : "xl" }}
      >
        <CView style={{ flex: 1, paddingTop: 20 }}>
          <CView style={{ position: "absolute", left: 0, top: -45 }}>
            <CButton title={t("save", "Tallenna")} onPress={save} />
          </CView>
          <CKeyboardAvoidingView style={{ flexGrow: 1 }}>
            {hasSpeechRecognition(props) ? (
              <SpeechToTextInput
                ref={modalSpeechRef}
                initialText={modalValue}
                onChange={onSpeechInputChanged}
                {...getCommonSpeechInputProps(props)}
                {...commonModalInputProps}
              />
            ) : (
              <CTextInput value={modalValue} onChangeText={setModalValue} {...getCommonTextInputProps()} {...commonModalInputProps} />
            )}
          </CKeyboardAvoidingView>
        </CView>
      </CModal>
      <CView>
        {hasSpeechRecognition(props) ? (
          <>
            <SpeechToTextInput
              initialText={value}
              ref={speechRef}
              onChange={onSpeechInputChangedOutsideModal}
              onPress={openModal}
              containerStyle={props.containerStyle}
              {...getCommonSpeechInputProps(props)}
              {...commonInnerInputProps}
            />
            {hasTextFix && (textFixAvailable || valueBeforeTextFix) && (
              <CView style={{ position: "absolute", left: 5, bottom: 8, zIndex: 1 }}>
                <CButton
                  title={valueBeforeTextFix ? t("rollback", "Peru korjaus") : t("ai-fix", "AI Korjaus")}
                  loading={isFixingText}
                  size="small"
                  variant="outline"
                  onPress={() => {
                    if (!valueBeforeTextFix) {
                      fixText();
                    } else {
                      rollbackTextFix();
                    }
                  }}
                />
              </CView>
            )}
          </>
        ) : (
          <CTouchableWithoutFeedback onPress={openModal} disabled={isDisabled} style={props.containerStyle}>
            <CTextInput value={value} {...getCommonTextInputProps()} {...commonInnerInputProps} />
          </CTouchableWithoutFeedback>
        )}
        {isLoading && <LoadingIndicator type="overlay" />}
      </CView>
    </>
  );
}
