import { Student } from "arwi-backend/src/types";
import { createRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, Platform, Switch, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Voice from "@react-native-voice/voice";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { CreateEvaluationInput, UpdateEvaluationInput } from "../gql/graphql";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { COLORS } from "../theme";
import CTextInput from "./primitives/CTextInput";
import RatingSelector from "./RatingSelector";
import CButton from "./primitives/CButton";
import { formatDate } from "../helpers/dateHelpers";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import { useModal } from "../hooks-and-providers/ModalProvider";
import CustomTextInputView from "../app/home/CustomTextInputView";

export type Evaluation = Omit<CreateEvaluationInput, "studentId"> & {
  student: Pick<Student, "id" | "name"> & {
    currentModuleEvaluations: Pick<Evaluation, "notes">[];
  };
};

export type EvaluationToUpdate = UpdateEvaluationInput & {
  student: Pick<Student, "id" | "name"> & {
    currentModuleEvaluations: Pick<Evaluation, "notes">[];
  };
};

// NOTE: For whatever reason you shouldn't use CView props with the EvaluationCards. This messes the memoization and causes unnecessary renders when using cards in a list.
// If styling or other is needed, wrap the EvaluationCard in other CView
type UpdateEvaluationCardProps = Omit<EvaluationCardProps, "hasParticipationToggle" | "evaluation" | "onChanged"> & {
  evaluation: EvaluationToUpdate;
  onChanged?: (evaluation: EvaluationToUpdate) => void;
};

type CreateEvaluationCardProps = Omit<EvaluationCardProps, "hasParticipationToggle" | "evaluation" | "onChanged"> & {
  evaluation: Evaluation;
  onChanged?: (evaluation: Evaluation) => void;
};

type EvaluationCardProps = {
  hasParticipationToggle?: boolean;
  evaluation: Evaluation | EvaluationToUpdate;
  date?: string;
  environment?: string;
  envColor?: string;
  onChanged: (key: EvaluationPropKeys, value: any) => void;
  height?: "auto" | number;
  hasArrowDown?: boolean;
  onArrowDownPress?: () => void;
};

type EvaluationPropKeys = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";

function EvaluationCard({
  onChanged,
  evaluation,
  date,
  environment,
  envColor,
  hasArrowDown,
  onArrowDownPress,
  hasParticipationToggle = true,
  height = "auto",
}: EvaluationCardProps) {
  const [notes, setNotes] = useState(() => evaluation.notes || "");
  const [textInputPresent, setTextInputPresent] = useState(false);

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
          const newNotes = notes.length === 0 ? `${event.value[0]}` : `${notes} ${event.value[0]}`;
          setNotes(newNotes);
          onChanged("notes", newNotes);
        }
        setRecording(false);
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
  }, [notes]);

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
    return evaluation.student.currentModuleEvaluations.filter((it) => !!it.notes).length;
  }, [evaluation]);

  let currentNotes = notes.length === 0 ? "" : `${notes} `;
  if (evaluation.wasPresent) {
    currentNotes = recording ? `${currentNotes}${currentRecordingAsText}` : notes;
  }

  const { openModal, closeModal } = useModal();

  const openTextInputModal = () => {
    openModal({
      placement: "bottom",
      innerViewStyles: { flex: 1, maxHeight: "100%", paddingTop: "2xl" },
      children: (
        <CustomTextInputView
          initialText={notes}
          onSave={(text) => {
            setNotes(text);
            onChanged("notes", text);
            closeModal();
          }}
        />
      ),
    });
  };

  return (
    <CView style={{ width: "100%", height, paddingTop: hasParticipationToggle ? 0 : "xl", gap: 6 }}>
      <CView style={{ gap: 3 }}>
        <CText style={{ fontSize: "title", fontWeight: "500" }}>{evaluation.student.name}</CText>
        {date && <CText style={{ fontSize: "sm", fontWeight: "300" }}>{formatDate(date)}</CText>}
        {envColor && environment && (
          <CView style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <CView style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: envColor }} />
            <CText style={{ fontSize: "sm", fontWeight: "300" }}>{environment}</CText>
          </CView>
        )}
      </CView>
      {/* TODO: Add isStellar star-button */}
      {hasParticipationToggle && (
        <CView style={{ width: "100%" }}>
          <CView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CText style={{ fontWeight: "500", color: evaluation.wasPresent ? "green" : "red" }}>
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
      <CView style={{ width: "100%", paddingTop: hasParticipationToggle ? 0 : "xl", zIndex: 10 }}>
        <CView style={{ paddingBottom: "sm" }}>
          <CText style={{ fontWeight: "500", fontSize: "sm" }}>{t("skills", "Taidot")}</CText>
          <RatingSelector
            disabled={!evaluation.wasPresent}
            initialRating={evaluation.skillsRating}
            onChange={(rating) => onChanged("skillsRating", rating)}
          />
        </CView>
        <CView style={{ paddingBottom: "sm" }}>
          <CText style={{ fontWeight: "500", fontSize: "sm" }}>{t("behaviour", "Työskentely")}</CText>
          <RatingSelector
            disabled={!evaluation.wasPresent}
            initialRating={evaluation.behaviourRating}
            onChange={(rating) => onChanged("behaviourRating", rating)}
          />
        </CView>
        <CText style={{ paddingBottom: "md", fontWeight: "300" }}>
          {t("update-evaluation-notes-given-count", "Sanallinen palaute (annettu {{count}} kertaa)", { count: givenNotesCount })}
        </CText>
        <CView style={{ width: "100%", height: 150 }}>
          <CTextInput
            style={{ width: "100%", height: "100%" }}
            as="textarea"
            editable={!recording}
            value={currentNotes}
            placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
            multiline
          />

          <CTouchableOpacity
            disabled={recording}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            onPress={() => openTextInputModal()}
          />
          <CView style={{ position: "absolute", left: 5, bottom: 5 }}>
            <CButton
              title={t("ai-fix", "AI Korjaus")}
              size="small"
              variant="outline"
              onPress={() => Alert.alert("Ei vielä toiminnassa, malta hetki!")}
            />
          </CView>
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
      {hasArrowDown && (
        <CView
          style={{
            position: "absolute",
            bottom: 70,
            alignItems: "center",
            width: "100%",
          }}
          pointerEvents="box-none"
        >
          <CButton variant="empty" onPress={onArrowDownPress} disableTouchEvent={!onArrowDownPress} style={{ flexDirection: "column" }}>
            <CText style={{ fontSize: "sm", textTransform: "uppercase", color: "primary" }}>{t("next-student", "Seuraava oppilas")}</CText>
            <MaterialCommunityIcon name="arrow-down" size={25} color={COLORS.primary} />
          </CButton>
        </CView>
      )}
    </CView>
  );
}

export function CreateEvaluationCard({ evaluation: initialEvaluation, onChanged: onChangedCallback, ...rest }: CreateEvaluationCardProps) {
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

export const CreateEvaluationCardMemoed = memo(CreateEvaluationCard);

export function UpdateEvaluationCard({ evaluation: initialEvaluation, onChanged: onChangedCallback, ...rest }: UpdateEvaluationCardProps) {
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

export const UpdateEvaluationCardMemoed = memo(UpdateEvaluationCard);
