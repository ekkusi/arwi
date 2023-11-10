import { Student } from "arwi-backend/src/types";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, Platform, Switch } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { useMutation } from "@apollo/client";
import { TextInput } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { CreateEvaluationInput, UpdateEvaluationInput } from "../gql/graphql";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { COLORS } from "../theme";
import RatingSelector from "./RatingSelector";
import CButton from "./primitives/CButton";
import { formatDate } from "../helpers/dateHelpers";
import { useModal } from "../hooks-and-providers/ModalProvider";
import CustomTextInputView from "../app/home/CustomTextInputView";
import { graphql } from "../gql";
import { useToast } from "../hooks-and-providers/ToastProvider";
import SpeechToTextInput, { SpeechToTextInputHandle } from "./form/SpeechToTextInput";

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

// export type EvaluationPropKey = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";
type EvaluationData = Omit<Evaluation | EvaluationToUpdate, "student">;
export type EvaluationPropKey = keyof EvaluationData;
export type EvaluationNoNotesPropKey = keyof Omit<EvaluationData, "notes">;

// NOTE: For whatever reason you shouldn't use CView props with the EvaluationCards. This messes the memoization and causes unnecessary renders when using cards in a list.
// If styling or other is needed, wrap the EvaluationCard in other CView
type UpdateEvaluationCardProps = Omit<EvaluationCardProps, "hasParticipationToggle" | "evaluation" | "onChanged"> & {
  evaluation: EvaluationToUpdate;
  onChanged?: (evaluation: EvaluationToUpdate) => void;
};

type CreateEvaluationCardProps = Omit<EvaluationCardProps, "hasParticipationToggle" | "evaluation" | "onChanged"> & {
  evaluation: Evaluation;
  onChanged?: (evaluation: Evaluation) => void;
  isActive: boolean;
};

type EvaluationCardProps = {
  hasParticipationToggle?: boolean;
  evaluation: Evaluation | EvaluationToUpdate;
  date?: string;
  environment?: string;
  envColor?: string;
  onChanged: (key: EvaluationPropKey, value: any) => void;
  height?: "auto" | number;
  hasArrowDown?: boolean;
  onArrowDownPress?: () => void;
  isActive?: boolean;
};

const EvaluationCard_FixTextGrammatics_Mutation = graphql(`
  mutation EvaluationCard_FixTextGrammatics($studentId: ID!, $text: String!) {
    fixTextGrammatics(studentId: $studentId, text: $text)
  }
`);

const TEXT_MIN_LENGTH_FOR_AI_FIX = 20;

const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const EXTRA_DEVICE_PADDING = Platform.OS === "ios" ? 43 : 49;
// NOTE: This is calculated manually and tested in a few devices. If the evaluation view UI gets broken on some devices, this might be the culprit.
export const CARD_HEIGHT = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - EXTRA_DEVICE_PADDING;

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
  isActive = true,
}: EvaluationCardProps) {
  const [notes, setNotes] = useState(() => evaluation.notes || "");
  const [previousNotes, setPreviousNotes] = useState<string | undefined>(undefined);
  const [newSpeechObtained, setNewSpeechObtained] = useState(false);
  const [data, setData] = useState<Omit<Evaluation | EvaluationToUpdate, "notes">>(evaluation);

  const [fixTextGrammatics, { loading: isFixingText }] = useMutation(EvaluationCard_FixTextGrammatics_Mutation);

  const speechRef = useRef<SpeechToTextInputHandle>(null);
  const inputRef = useRef<TextInput>(null);

  const onDataChanged = useCallback(
    (key: EvaluationNoNotesPropKey, value: any) => {
      if (key === "isStellar") return;
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
      onChanged(key, value);
    },
    [onChanged]
  );

  const onNotesChanged = useCallback(
    (value: string, resetPreviousNotes: boolean = false) => {
      setNotes(value);
      onChanged("notes", value);
      if (value.length === 0) {
        setNewSpeechObtained(false);
      }
      if (resetPreviousNotes) {
        setPreviousNotes(undefined);
      }
    },
    [onChanged]
  );

  const { t } = useTranslation();

  const givenNotesCount = useMemo(() => {
    return evaluation.student.currentModuleEvaluations.filter((it) => !!it.notes).length;
  }, [evaluation]);

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const openTextInputModal = () => {
    speechRef.current?.removeVoiceListeners().then(() => {
      openModal({
        placement: "bottom",
        innerViewStyles: { flex: 1, maxHeight: "100%", paddingTop: "2xl" },
        children: (
          <CustomTextInputView
            initialText={notes}
            onSave={(text, speechObtained) => {
              onNotesChanged(text, true);
              closeModal();
              if (speechObtained) setNewSpeechObtained(true);
            }}
            isActive={isActive}
            onClose={() => {
              if (isActive) speechRef.current?.refreshVoiceListeners();
            }}
          />
        ),
      });
    });
  };

  const fixText = async () => {
    try {
      const studentId = evaluation.student.id;

      const process = fixTextGrammatics({
        variables: {
          studentId,
          text: notes,
        },
      });
      const result = await process;

      if (!result.data?.fixTextGrammatics) throw new Error("Text rephrasing failed");
      setPreviousNotes(notes);
      const resultText = result.data?.fixTextGrammatics;
      setNotes(resultText);
      onChanged("notes", resultText);
      setNewSpeechObtained(false);
      openToast(t("ai-fix-completed", "Oppilaan {{studentName}} arvioinnin korjaus suoritettu.", { studentName: evaluation.student.name }));
    } catch (e) {
      console.error(e);
      Alert.alert(t("text-fix-error", "Tekstin korjaamisessa tapahtui virhe."));
    }
  };

  const rollbackTextFix = () => {
    if (previousNotes) {
      onNotesChanged(previousNotes, true);
    }
  };

  const textFixAvailable = notes.length >= TEXT_MIN_LENGTH_FOR_AI_FIX && newSpeechObtained;

  return (
    <CView style={{ width: "100%", height, paddingTop: "xl", gap: 6 }}>
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
                onDataChanged("wasPresent", value);
              }}
              value={data.wasPresent || false}
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
            initialRating={data.skillsRating}
            onChange={(rating) => onDataChanged("skillsRating", rating)}
          />
        </CView>
        <CView style={{ paddingBottom: "sm" }}>
          <CText style={{ fontWeight: "500", fontSize: "sm" }}>{t("behaviour", "Työskentely")}</CText>
          <RatingSelector
            disabled={!evaluation.wasPresent}
            initialRating={data.behaviourRating}
            onChange={(rating) => onDataChanged("behaviourRating", rating)}
          />
        </CView>
        <CText style={{ paddingBottom: "md", fontWeight: "300" }}>
          {t("update-evaluation-notes-given-count", "Sanallinen palaute (annettu {{count}} kertaa)", { count: givenNotesCount })}
        </CText>
        <CView style={{ width: "100%", height: 150 }}>
          <SpeechToTextInput
            ref={speechRef}
            inputRef={inputRef}
            initialText={notes}
            isActive={isActive}
            isDisabled={isFixingText}
            placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
            onPress={() => openTextInputModal()}
            onChange={(newText, speechObtained) => {
              onNotesChanged(newText);
              if (speechObtained) setNewSpeechObtained(true);
            }}
          />

          {(textFixAvailable || previousNotes) && (
            <CView style={{ position: "absolute", left: 5, bottom: 8, zIndex: 1 }}>
              <CButton
                title={previousNotes ? t("rollback", "Peru korjaus") : t("ai-fix", "AI Korjaus")}
                loading={isFixingText}
                size="small"
                variant="outline"
                onPress={() => {
                  if (!previousNotes) {
                    fixText();
                  } else {
                    rollbackTextFix();
                  }
                }}
              />
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
            bottom: Platform.OS === "ios" ? 65 : 60,
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

export function CreateEvaluationCard({ evaluation, onChanged: onChangedCallback, ...rest }: CreateEvaluationCardProps) {
  const [_, setEvaluation] = useState(evaluation);

  const onChanged = useCallback(
    (key: EvaluationPropKey, value: any) => {
      setEvaluation((oldEvaluation) => {
        const newData = {
          ...oldEvaluation,
          [key]: value,
        };
        onChangedCallback?.(newData);
        return newData;
      });
    },
    [onChangedCallback]
  );

  return <EvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle={false} {...rest} />;
}

export const CreateEvaluationCardMemoed = memo(CreateEvaluationCard);

export function UpdateEvaluationCard({ evaluation, onChanged: onChangedCallback, ...rest }: UpdateEvaluationCardProps) {
  const [_, setEvaluation] = useState(evaluation);

  // NOTE: This is a bit hacky, but it works. The problem is that the evaluation object is not updated when the user changes the notes so have to get updated data through setState callback.
  const onChanged = useCallback(
    (key: EvaluationPropKey, value: any) => {
      setEvaluation((oldEvaluation) => {
        const newData = {
          ...oldEvaluation,
          [key]: value,
        };
        onChangedCallback?.(newData);
        return newData;
      });
    },
    [onChangedCallback]
  );

  return <EvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle {...rest} />;
}

export const UpdateEvaluationCardMemoed = memo(UpdateEvaluationCard);
