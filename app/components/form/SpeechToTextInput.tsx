import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Alert, Platform, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import CView from "../primitives/CView";
import CTouchableOpacity from "../primitives/CTouchableOpacity";
import { COLORS } from "../../theme";
import { CViewStyle } from "../../theme/types";
import CTouchableWithoutFeedback from "../primitives/CTouchableWithoutFeedback";

export type SpeechToTextInputProps = Omit<CTextInputProps, "onChange"> & {
  initialText?: string;
  onChange?: (text: string, speechObtained: boolean) => void;
  inputRef?: React.RefObject<TextInput>;
  containerStyle?: CViewStyle;
  microphoneStyle?: CViewStyle;
  focusOnMount?: boolean;
  onClose?: () => void;
  onPress?: () => void;
  isActive: boolean;
};

export type SpeechToTextInputHandle = {
  recording: boolean;
  refreshVoiceListeners: () => Promise<void>;
  removeVoiceListeners: () => Promise<void>;
};

const CLOSE_SPEECH_TIMEOUT_MS = 3000;

export default forwardRef<SpeechToTextInputHandle, SpeechToTextInputProps>(
  (
    {
      initialText = "",
      isActive,
      onChange: _onChange,
      inputRef: _inputRef,
      focusOnMount = false,
      containerStyle,
      microphoneStyle,
      onClose: _onClose,
      onPress,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const [text, setText] = useState(() => {
      return initialText;
    });
    const [_, setBeforeRecordingText] = useState(() => {
      return initialText;
    });

    const [speechObtained, setSpeechObtained] = useState(false);
    const [recording, setRecording] = useState(false);

    const { t } = useTranslation();

    const inputRef = _inputRef || createRef<TextInput>();
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    const microphoneOpenScale = useSharedValue(1);
    const microphoneAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: microphoneOpenScale.value }],
      };
    });

    const onClose = useCallback(() => {
      _onClose?.();
      // NOTE: See the note of onChange.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSpeechResults = (event: SpeechResultsEvent, updateBeforeRecordingText = false) => {
      if (event.value) {
        const newPartialValue = event.value[0];

        setBeforeRecordingText((oldBeforeRecordingText) => {
          const newValue = oldBeforeRecordingText.length > 0 ? `${oldBeforeRecordingText.trim()} ${newPartialValue}` : newPartialValue;

          setText(newValue);

          // Only update beforeRecordingText as well if it is explicitly wanted
          return updateBeforeRecordingText ? newValue : oldBeforeRecordingText;
        });
      }
    };

    // Update through setText function so that no dependencies are needed (state not accessible in voice listeners)
    const updateBeforeRecordingText = () => {
      setText((currentText) => {
        setBeforeRecordingText(currentText);
        return currentText;
      });
    };

    const refreshVoiceListeners = useCallback(async () => {
      if (!isActive) return;
      Voice.isAvailable().then(() => {
        Voice.onSpeechError = () => {
          setRecording(false);
        };
        Voice.onSpeechStart = () => {
          setSpeechObtained(true);
        };
        Voice.onSpeechEnd = () => {
          setRecording(false);
          // On Android the onSpeechResults is actually run after onSpeechEnd so we have to empty the currentRecordingAsText there instead.
          if (Platform.OS === "ios") {
            updateBeforeRecordingText();
          }
        };
        Voice.onSpeechPartialResults = (event) => {
          handleSpeechResults(event);
        };
        // On iOS the onSpeechResults runs exactly the same oneSpeechPartialResults, so it doesn't need to be registered.
        if (Platform.OS !== "ios") {
          Voice.onSpeechResults = (event) => {
            handleSpeechResults(event, true);
          };
        }
      });
    }, [isActive]);

    const removeVoiceListeners = useCallback(async () => {
      if (!isActive) return;
      try {
        Voice.destroy().then(() => {
          Voice.removeAllListeners();
          onClose();
        });
      } catch (error) {
        Alert.alert("Error");
      }
    }, [onClose, isActive]);

    useImperativeHandle(ref, () => ({
      recording,
      refreshVoiceListeners,
      removeVoiceListeners,
    }));

    const onChange = useCallback((newText: string, newSpeechObtained: boolean) => {
      _onChange?.(newText, newSpeechObtained);
      // NOTE: This forces onChange prop function to not cause infinite loop in useEffect.
      // However, if the onChange prop were to actually change for some reason, it wouldn't be updated to this component noted because of this.
      // For that reason this might cause some weird behaviour in the parent components unless the passed onChange function is designed properly so that it doesn't change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stopRecording = useCallback(async () => {
      try {
        await Voice.stop();
        microphoneOpenScale.value = 1;
        setRecording(false);
      } catch (error) {
        Alert.alert(t("recording-error", "Tapahtui virhe."));
      }
    }, [microphoneOpenScale, t]);

    const setCloseTimeout = useCallback(() => {
      if (Platform.OS === "android") return; // Android has it's own default stop functionality for Voice.
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      closeTimeout.current = setTimeout(() => {
        stopRecording();
      }, CLOSE_SPEECH_TIMEOUT_MS);
    }, [stopRecording]);

    const startRecording = () => {
      microphoneOpenScale.value = 1;
      const microphoneOpenAnimation = withRepeat(withTiming(0.8, { duration: 700, easing: Easing.ease }), -1, true, () => {});
      microphoneOpenScale.value = microphoneOpenAnimation;
      try {
        Voice.start("fi-FI")
          .then(() => {
            setRecording(true);
            setCloseTimeout();
          })
          .catch((err) => Alert.alert(t("recording-error", "Tapahtui virhe"), err));
      } catch (err) {
        Alert.alert(t("recording-error", "Tapahtui virhe."), err);
      }
    };

    // Overwrite text when initialText changes
    useEffect(() => {
      if (initialText === text) return;

      setText(initialText);
      setBeforeRecordingText(initialText);

      // Only run this when initialText prop changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialText]);

    useEffect(() => {
      refreshVoiceListeners();
      return () => {
        removeVoiceListeners();
      };
    }, [refreshVoiceListeners, removeVoiceListeners]);

    // Run onChange when text changes
    useEffect(() => {
      onChange?.(text, speechObtained);
    }, [onChange, speechObtained, text]);

    // Reset speech closing timeout when recording is made
    useEffect(() => {
      if (recording) {
        setCloseTimeout();
      }
    }, [recording, setCloseTimeout, text]);

    useEffect(() => {
      if (focusOnMount) setTimeout(() => inputRef.current?.focus(), 100);
    }, [focusOnMount, inputRef]);

    return (
      <CView style={{ flex: 1, width: "100%", ...containerStyle }}>
        <CTouchableWithoutFeedback style={{ flex: 1, width: "100%" }} onPress={onPress} disabled={isDisabled}>
          <CTextInput
            ref={inputRef}
            style={{ flex: 1, width: "100%", ...rest?.style }}
            as="textarea"
            editable={!recording}
            value={text}
            isDisabled={isDisabled}
            onChange={(e) => {
              const newValue = e.nativeEvent.text;
              if (!recording) {
                setText(newValue);
                setBeforeRecordingText(newValue);
              }
            }}
            multiline
            {...rest}
          />
        </CTouchableWithoutFeedback>
        <CView style={{ position: "absolute", bottom: 5, right: 5, ...microphoneStyle }}>
          <CView style={{ width: 40, height: 40 }}>
            {recording && (
              <Animated.View
                style={[{ position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary }, microphoneAnimatedStyle]}
              />
            )}
            <CTouchableOpacity
              disabled={isDisabled}
              onPress={() => (recording ? stopRecording() : startRecording())}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                width: 40,
                height: 40,
                zIndex: 999,
              }}
            >
              <MaterialCommunityIcon name="microphone" size={25} color={recording ? COLORS.white : COLORS.secondary} />
            </CTouchableOpacity>
          </CView>
        </CView>
      </CView>
    );
  }
);
