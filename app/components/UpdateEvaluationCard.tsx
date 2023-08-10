import { Student } from "arwi-backend/src/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Switch } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice from "@react-native-voice/voice";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { CreateEvaluationInput, UpdateEvaluationInput } from "../gql/graphql";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";
import { COLORS } from "../theme";
import CTextInput from "./primitives/CTextInput";
import RatingSelector from "./RatingSelector";

export type Evaluation = Omit<CreateEvaluationInput, "studentId"> & {
  student: Pick<Student, "id" | "name"> & {
    currentClassEvaluations: Pick<Evaluation, "notes">[];
  };
};

export type EvaluationToUpdate = UpdateEvaluationInput & {
  student: Pick<Student, "id" | "name"> & {
    currentClassEvaluations: Pick<Evaluation, "notes">[];
  };
};

type UpdateEvaluationCardProps = Omit<CViewProps, "children"> & {
  hasParticipationToggle?: boolean;
  evaluation: EvaluationToUpdate;
  onChanged?: (evaluation: EvaluationToUpdate) => void;
};

type CreateEvaluationCardProps = Omit<CViewProps, "children"> & {
  hasParticipationToggle?: boolean;
  evaluation: Evaluation;
  onChanged?: (evaluation: Evaluation) => void;
};

type EvaluationCardProps = Omit<CViewProps, "children"> & {
  hasParticipationToggle?: boolean;
  evaluation: Evaluation | EvaluationToUpdate;
  onChanged: (key: EvaluationPropKeys, value: any) => void;
};

type EvaluationPropKeys = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";

function EvaluationCard({ onChanged, evaluation, hasParticipationToggle = true, ...rest }: EvaluationCardProps) {
  const [notes, setNotes] = useState(() => evaluation.notes || "");

  const debouncedOnChanged = useMemo(() => debounce(onChanged, 300), [onChanged]);

  const changeNotes = (value: string) => {
    setNotes(value);

    debouncedOnChanged("notes", value);
  };

  const microphoneOpenScale = useSharedValue(1);
  const microphoneAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: microphoneOpenScale.value }],
    };
  });

  const { t } = useTranslation();

  const [currentRecordingAsText, setCurrentRecordingAsText] = useState("");
  const [recording, setRecording] = useState(false);
  const [microphoneAvailable, setMicrophoneAvailable] = useState(true);

  const startRecording = () => {
    microphoneOpenScale.value = 1;
    const microphoneOpenAnimation = withRepeat(withTiming(0.8, { duration: 700, easing: Easing.ease }), -1, true, () => {});
    microphoneOpenScale.value = microphoneOpenAnimation;
    try {
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
          onChanged("notes", `${notes} ${event.value[0]}`);
        }
      };
      Voice.start("fi-FI")
        .then(() => setRecording(true))
        .catch((err) => Alert.alert(t("recording-error", "Tapahtui virhe"), err));
    } catch (err) {
      Alert.alert(t("recording-error", "Tapahtui virhe."), err);
    }
  };

  useEffect(() => {
    return () => {
      try {
        Voice.destroy().then(Voice.removeAllListeners);
      } catch (error) {
        console.error(error);
      }
    };
  }, [t, notes]);

  const stopRecording = async () => {
    try {
      await Voice.stop();
      microphoneOpenScale.value = 1;
      setRecording(false);
    } catch (error) {
      Alert.alert(t("recording-error", "Tapahtui virhe."));
    }
  };

  const givenNotesCount = useMemo(() => {
    return evaluation.student.currentClassEvaluations.filter((it) => !!it.notes).length;
  }, [evaluation]);

  let currentNotes = "";
  if (evaluation.wasPresent) {
    currentNotes = recording ? `${notes} ${currentRecordingAsText}` : notes;
  }

  return (
    <CView style={{ width: "100%", alignItems: "center", gap: "lg" }} {...rest}>
      <CText style={{ fontSize: "lg", textAlign: "center" }}>{evaluation.student.name}</CText>
      {/* TODO: Add isStellar star-button */}
      {hasParticipationToggle && (
        <CView style={{ alignItems: "center", width: "100%" }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "50%" }}>
            <CText style={{ textAlign: "center", color: evaluation.wasPresent ? "green" : "red" }}>
              {evaluation.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
            </CText>
            <Switch
              trackColor={{ false: COLORS.lightgray, true: COLORS.primary }}
              thumbColor={COLORS.white}
              ios_backgroundColor={COLORS.lightgray}
              onValueChange={(value) => {
                onChanged("wasPresent", value);
              }}
              value={evaluation.wasPresent || false}
              style={{ transform: [{ scale: Platform.OS === "ios" ? 1 : 1.4 }] }}
            />
          </CView>
        </CView>
      )}
      <CView style={{ width: "100%" }}>
        <CView style={{ alignItems: "center", gap: "sm" }}>
          <CText>{t("skills", "Taidot")}:</CText>
          <RatingSelector
            disabled={!evaluation.wasPresent}
            initialRating={evaluation.skillsRating}
            onChange={(rating) => onChanged("skillsRating", rating)}
          />
        </CView>
        <CView style={{ alignItems: "center", gap: "sm" }}>
          <CText>{t("behaviour", "Työskentely")}:</CText>
          <RatingSelector
            disabled={!evaluation.wasPresent}
            initialRating={evaluation.behaviourRating}
            onChange={(rating) => onChanged("behaviourRating", rating)}
          />
        </CView>
        <CText>{t("update-evaluation-notes-given-count", "Sanallinen palaute (annettu {{count}} kertaa)", { count: givenNotesCount })}</CText>
        <CView style={{ width: "100%", height: 150 }}>
          <CTextInput
            style={{ width: "100%", height: "100%" }}
            as="textarea"
            editable={!recording}
            value={currentNotes}
            onChange={(e) => changeNotes(e.nativeEvent.text)}
            placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
            multiline
          />
          {microphoneAvailable && (
            <CView style={{ position: "absolute", bottom: 3, right: 3, width: 40, height: 40 }}>
              {recording && (
                <Animated.View
                  style={[
                    { position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary },
                    microphoneAnimatedStyle,
                  ]}
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
          )}
        </CView>
        {!evaluation.wasPresent && (
          <Animated.View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(255,255,255,0.5)" }} />
        )}
      </CView>
    </CView>
  );
}

export function CreateEvaluationCard({
  evaluation: initialEvaluation,
  onChanged: onChangedCallback,
  hasParticipationToggle = true,
  ...rest
}: CreateEvaluationCardProps) {
  const [evaluation, setEvaluation] = useState(initialEvaluation);

  const onChanged = useCallback(
    (key: EvaluationPropKeys, value: any) => {
      const newEvaluation = {
        ...evaluation,
        [key]: value,
      };
      setEvaluation(newEvaluation);

      if (onChangedCallback) {
        onChangedCallback(newEvaluation);
      }
    },
    [evaluation, onChangedCallback]
  );

  return <EvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle={false} {...rest} />;
}

export function UpdateEvaluationCard({
  evaluation: initialEvaluation,
  onChanged: onChangedCallback,
  hasParticipationToggle = true,
  ...rest
}: UpdateEvaluationCardProps) {
  const [evaluation, setEvaluation] = useState(initialEvaluation);

  const onChanged = useCallback(
    (key: EvaluationPropKeys, value: any) => {
      const newEvaluation = {
        ...evaluation,
        [key]: value,
      };
      setEvaluation(newEvaluation);

      if (onChangedCallback) {
        onChangedCallback(newEvaluation);
      }
    },
    [evaluation, onChangedCallback]
  );

  return <EvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle {...rest} />;
}
