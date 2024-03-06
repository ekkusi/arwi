import { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { Alert, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CView from "../primitives/CView";
import { COLORS } from "../../theme";

type VoiceRecorderProps = {
  currentText: string;
  onResult: (recordedText: string) => void;
  onPartialResult: (recordedText: string) => void;
  onStartRecording?: () => void;
  onEndRecording?: () => void;
};

export default function VoiceRecorder({ currentText, onResult, onPartialResult, onStartRecording, onEndRecording }: VoiceRecorderProps) {
  const [text, setText] = useState(() => currentText);
  const [recording, setRecording] = useState(false);

  const { t } = useTranslation();

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
      Voice.onSpeechError = (_) => {
        setRecording(false);
        onEndRecording?.();
      };
      Voice.onSpeechPartialResults = (event) => {
        if (event.value) {
          onPartialResult(event.value[0]);
        }
      };
      Voice.onSpeechResults = (event) => {
        if (event.value) {
          setText(`${text} ${event.value[0]}`);
          onResult(`${text} ${event.value[0]}`);
        }
      };
      Voice.start("fi-FI")
        .then(() => {
          setRecording(true);
          onStartRecording?.();
        })
        .catch((err) => Alert.alert(t("recording-error", "Tapahtui virhe"), err));
    } catch (err) {
      Alert.alert(t("recording-error", "Tapahtui virhe."), err);
    }
  };

  useEffect(() => {
    return () => {
      Alert.alert("destroying");
      try {
        Voice.destroy().then(Voice.removeAllListeners);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  const stopRecording = async () => {
    try {
      await Voice.stop();
      microphoneOpenScale.value = 1;
      setRecording(false);
      onEndRecording?.();
    } catch (error) {
      Alert.alert(t("recording-error", "Tapahtui virhe."));
    }
  };

  return (
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
  );
}
