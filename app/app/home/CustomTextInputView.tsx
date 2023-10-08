import { createRef, useEffect, useMemo, useState } from "react";
import Voice from "@react-native-voice/voice";
import { useTranslation } from "react-i18next";
import { Alert, NativeSyntheticEvent, TextInputSelectionChangeEventData, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../components/primitives/CButton";
import CTextInput from "../../components/primitives/CTextInput";
import CView from "../../components/primitives/CView";
import { COLORS } from "../../theme";

type CustomTextInputViewProps = {
  initialText: string;
  onSave: (text: string, speechObtained: boolean) => void;
};

export default function CustomTextInputView({ initialText, onSave }: CustomTextInputViewProps) {
  const [text, setText] = useState(() => initialText);

  const [speechObtained, setSpeechObtained] = useState(false);
  const [currentRecordingAsText, setCurrentRecordingAsText] = useState("");
  const [recording, setRecording] = useState(false);

  const { t } = useTranslation();

  const inputRef = createRef<TextInput>();

  const microphoneOpenScale = useSharedValue(1);
  const microphoneAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: microphoneOpenScale.value }],
    };
  });

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

  useEffect(() => {
    Voice.isAvailable().then(() => {
      Voice.onSpeechError = (_) => {
        setRecording(false);
      };
      Voice.onSpeechPartialResults = (event) => {
        if (event.value) {
          setCurrentRecordingAsText(event.value[0]);
        }
      };
      Voice.onSpeechResults = (event) => {
        if (event.value) {
          setCurrentRecordingAsText("");
          const newText = text.length === 0 ? `${event.value[0]}` : `${text} ${event.value[0]}`;
          setText(newText);
          setSpeechObtained(true);
        }
        setRecording(false);
      };
    });
    return () => {
      try {
        Voice.destroy().then(() => {
          Voice.removeAllListeners();
        });
      } catch (error) {
        Alert.alert("MOi");
      }
    };
  }, [text]);

  const stopRecording = async () => {
    try {
      await Voice.stop();
      microphoneOpenScale.value = 1;
      setRecording(false);
    } catch (error) {
      Alert.alert(t("recording-error", "Tapahtui virhe."));
    }
  };

  useEffect(() => {
    if (!recording) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [inputRef, recording]);

  let currentText = text.length === 0 ? "" : `${text} `;
  currentText = recording ? `${currentText}${currentRecordingAsText}` : `${text}`;

  return (
    <CView style={{ flex: 1 }}>
      <CTextInput
        ref={inputRef}
        style={{ flex: 1, width: "100%" }}
        as="textarea"
        editable={!recording}
        value={currentText}
        onChange={(e) => setText(e.nativeEvent.text)}
        placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
        multiline
      />
      <CView style={{ position: "absolute", bottom: 20, right: 20 }}>
        <CView style={{ width: 40, height: 40 }}>
          {recording && (
            <Animated.View
              style={[{ position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary }, microphoneAnimatedStyle]}
            />
          )}
          <TouchableOpacity
            onPress={() => (recording ? stopRecording() : startRecording())}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              width: 40,
              height: 40,
            }}
          >
            <MaterialCommunityIcon name="microphone" size={25} color={recording ? COLORS.white : COLORS.secondary} />
          </TouchableOpacity>
        </CView>
      </CView>
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
