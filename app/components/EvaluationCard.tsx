import { Student } from "arwi-backend/src/types";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Switch } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { useMutation } from "@apollo/client";
import { CreateEvaluationInput, UpdateEvaluationInput } from "../gql/graphql";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { COLORS } from "../theme";
import RatingSelector from "./RatingSelector";
import CButton from "./primitives/CButton";
import { formatDate } from "../helpers/dateHelpers";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
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

const EvaluationCard_FixTextGrammatics_Mutation = graphql(`
  mutation EvaluationCard_FixTextGrammatics($studentId: ID!, $text: String!) {
    fixTextGrammatics(studentId: $studentId, text: $text)
  }
`);

type EvaluationPropKeys = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";

const TEXT_MIN_LENGTH_FOR_AI_FIX = 20;

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
  const [previousNotes, setPreviousNotes] = useState<string | undefined>(undefined);
  const [newSpeechObtained, setnewSpeechObtained] = useState(false);

  const [fixTextGrammatics, { loading: isFixingText }] = useMutation(EvaluationCard_FixTextGrammatics_Mutation);

  const speechRef = useRef<SpeechToTextInputHandle>(null);

  const changeNotes = useCallback(
    (value: string, resetPreviousNotes: boolean = false) => {
      setNotes(value);
      onChanged("notes", value);
      if (value.length === 0) {
        setnewSpeechObtained(false);
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
    openModal({
      placement: "bottom",
      innerViewStyles: { flex: 1, maxHeight: "100%", paddingTop: "2xl" },
      children: (
        <CustomTextInputView
          initialText={notes}
          onSave={(text, speechObtained) => {
            changeNotes(text, true);
            closeModal();
            if (speechObtained) setnewSpeechObtained(true);
          }}
        />
      ),
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
      setnewSpeechObtained(false);
      openToast(t("ai-fix-completed", "Oppilaan {{studentName}} arvioinnin korjaus suoritettu.", { studentName: evaluation.student.name }));
    } catch (e) {
      console.error(e);
      Alert.alert(t("text-fix-error", "Tekstin korjaamisessa tapahtui virhe."));
    }
  };

  const rollbackTextFix = () => {
    if (previousNotes) {
      changeNotes(previousNotes, true);
    }
  };

  const textFixAvailable = notes.length >= TEXT_MIN_LENGTH_FOR_AI_FIX && newSpeechObtained;

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
          <SpeechToTextInput
            ref={speechRef}
            initialText={notes}
            placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
            onChange={(newText, _) => {
              changeNotes(newText);
            }}
          />

          <CTouchableOpacity
            disabled={speechRef.current?.recording || isFixingText}
            style={{ position: "absolute", width: "100%", height: "100%" }}
            onPress={() => openTextInputModal()}
          />
          {/* {(textFixAvailable || previousNotes) && (
            <CView style={{ position: "absolute", left: 5, bottom: 5 }}>
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
          )} */}
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
