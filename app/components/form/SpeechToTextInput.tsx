import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Alert, Platform, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import CView from "../primitives/CView";
import CTouchableOpacity from "../primitives/CTouchableOpacity";
import { COLORS } from "../../theme";
import { CViewStyle } from "../../theme/types";

type SpeechToTextInputProps = Omit<CTextInputProps, "onChange"> & {
  initialText?: string;
  onChange?: (text: string, speechObtained: boolean) => void;
  inputRef?: React.RefObject<TextInput>;
  containerStyle?: CViewStyle;
  microphoneStyle?: CViewStyle;
  focusOnMount?: boolean;
  onClose?: () => void;
  isActive: boolean;
};

export type SpeechToTextInputHandle = {
  recording: boolean;
  refreshVoiceListeners: () => Promise<void>;
  removeVoiceListeners: () => Promise<void>;
};

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
      ...rest
    },
    ref
  ) => {
    const [text, setText] = useState(() => {
      return initialText;
    });

    const [speechObtained, setSpeechObtained] = useState(false);
    const [_, setCurrentRecordingAsText] = useState("");
    const [recording, setRecording] = useState(false);

    const { t } = useTranslation();

    const inputRef = _inputRef || createRef<TextInput>();

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
            setCurrentRecordingAsText("");
          }
        };
        Voice.onSpeechPartialResults = (event) => {
          handleSpeechResults(event);
        };
        // On iOS the onSpeechResults runs exactly the same oneSpeechPartialResults, so it doesn't need to be registered.
        if (Platform.OS !== "ios") {
          Voice.onSpeechResults = (event) => {
            handleSpeechResults(event);
            setCurrentRecordingAsText("");
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

    const handleSpeechResults = (event: SpeechResultsEvent) => {
      if (event.value) {
        const newPartialValue = event.value[0];
        setCurrentRecordingAsText((oldCurrentRecording) => {
          // If the partial is the first record meaning oldCurrentRecord is empty, we just add the partial to the text.
          // Otherwise we remove the matching partial and add the new one.
          if (oldCurrentRecording.length === 0) {
            setText((oldText) => {
              return oldText.length > 0 ? `${oldText.trim()} ${newPartialValue}` : newPartialValue;
            });
          } else {
            setText((oldText) => {
              return `${oldText.substring(0, oldText.lastIndexOf(oldCurrentRecording))}${newPartialValue}`;
            });
          }
          return newPartialValue;
        });
      }
    };

    // Overwrite text when initialText changes
    useEffect(() => {
      if (initialText === text) return;
      setText(initialText);

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

    useEffect(() => {
      if (focusOnMount) setTimeout(() => inputRef.current?.focus(), 100);
    }, [focusOnMount, inputRef]);

    const startRecording = () => {
      microphoneOpenScale.value = 1;
      const microphoneOpenAnimation = withRepeat(withTiming(0.8, { duration: 700, easing: Easing.ease }), -1, true, () => {});
      microphoneOpenScale.value = microphoneOpenAnimation;
      try {
        Voice.start("fi-FI")
          .then(() => {
            setRecording(true);
          })
          .catch((err) => Alert.alert(t("recording-error", "Tapahtui virhe"), err));
      } catch (err) {
        Alert.alert(t("recording-error", "Tapahtui virhe."), err);
      }
    };

    const stopRecording = async () => {
      try {
        await Voice.stop();
        microphoneOpenScale.value = 1;
        setRecording(false);
      } catch (error) {
        Alert.alert(t("recording-error", "Tapahtui virhe."));
      }
    };

    return (
      <CView style={{ flex: 1, width: "100%", ...containerStyle }}>
        <CTextInput
          ref={inputRef}
          style={{ flex: 1, width: "100%", ...rest?.style }}
          as="textarea"
          editable={!recording}
          value={text}
          onChange={(e) => {
            setText(e.nativeEvent.text);
          }}
          multiline
          {...rest}
        />
        <CView style={{ position: "absolute", bottom: 5, right: 5, ...microphoneStyle }}>
          <CView style={{ width: 40, height: 40 }}>
            {recording && (
              <Animated.View
                style={[{ position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary }, microphoneAnimatedStyle]}
              />
            )}
            <CTouchableOpacity
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
