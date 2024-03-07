import { CreateClassParticipationEvaluationInput, Student, UpdateClassParticipationEvaluationInput } from "arwi-backend/src/types";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, Switch } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import { COLORS } from "../../theme";
import RatingSelector from "../form/RatingSelector";
import CButton from "../primitives/CButton";
import { formatDate } from "../../helpers/dateHelpers";
import ModalTextInput from "../form/ModalTextInput";

export type Evaluation = Omit<CreateClassParticipationEvaluationInput, "studentId"> & {
  student: Pick<Student, "id" | "name"> & {
    currentModuleEvaluations: Pick<Evaluation, "notes">[];
  };
};

export type EvaluationToUpdate = UpdateClassParticipationEvaluationInput & {
  student: Pick<Student, "id" | "name"> & {
    currentModuleEvaluations: Pick<Evaluation, "notes">[];
  };
};

// export type EvaluationPropKey = "skillsRating" | "behaviourRating" | "notes" | "wasPresent";
type EvaluationData = Omit<Evaluation | EvaluationToUpdate, "student">;
export type EvaluationPropKey = keyof EvaluationData;
export type EvaluationNoNotesPropKey = keyof Omit<EvaluationData, "notes">;

// NOTE: For whatever reason you shouldn't use CView props with the ClassParticipationEvaluationCards. This messes the memoization and causes unnecessary renders when using cards in a list.
// If styling or other is needed, wrap the ClassParticipationEvaluationCard in other CView
type UpdateClassParticipationEvaluationCardProps = Omit<
  ClassParticipationEvaluationCardProps,
  "hasParticipationToggle" | "evaluation" | "onChanged"
> & {
  evaluation: EvaluationToUpdate;
  onChanged?: (evaluation: EvaluationToUpdate) => void;
};

type CreateClassParticipationEvaluationCardProps = Omit<
  ClassParticipationEvaluationCardProps,
  "hasParticipationToggle" | "evaluation" | "onChanged"
> & {
  evaluation: Evaluation;
  onChanged?: (evaluation: Evaluation) => void;
  isActive: boolean;
};

type ClassParticipationEvaluationCardProps = {
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

const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const EXTRA_DEVICE_PADDING = Platform.OS === "ios" ? 43 : 49;
// NOTE: This is calculated manually and tested in a few devices. If the evaluation view UI gets broken on some devices, this might be the culprit.
export const CARD_HEIGHT = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - EXTRA_DEVICE_PADDING;

function ClassParticipationEvaluationCard({
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
}: ClassParticipationEvaluationCardProps) {
  const [notes, setNotes] = useState(() => evaluation.notes || "");
  const [data, setData] = useState<Omit<Evaluation | EvaluationToUpdate, "notes">>(evaluation);

  const onDataChanged = useCallback(
    (key: EvaluationNoNotesPropKey, value: any) => {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
      onChanged(key, value);
    },
    [onChanged]
  );

  const onNotesChanged = useCallback(
    (value: string) => {
      setNotes(value);
      onChanged("notes", value);
    },
    [onChanged]
  );

  const { t } = useTranslation();

  const givenNotesCount = useMemo(() => {
    return evaluation.student.currentModuleEvaluations.filter((it) => !!it.notes).length;
  }, [evaluation]);

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
        <ModalTextInput
          initialValue={notes}
          hasSpeechRecognition
          isActive={isActive}
          placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
          textFixSuccessMessage={t("ai-fix-completed", "Oppilaan {{studentName}} arvioinnin korjaus suoritettu.", {
            studentName: evaluation.student.name,
          })}
          onChange={onNotesChanged}
        />
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

export function CreateClassParticipationEvaluationCard({
  evaluation,
  onChanged: onChangedCallback,
  ...rest
}: CreateClassParticipationEvaluationCardProps) {
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

  return <ClassParticipationEvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle={false} {...rest} />;
}

export const CreateClassParticipationEvaluationCardMemoed = memo(CreateClassParticipationEvaluationCard);

export function UpdateClassParticipationEvaluationCard({
  evaluation,
  onChanged: onChangedCallback,
  ...rest
}: UpdateClassParticipationEvaluationCardProps) {
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

  return <ClassParticipationEvaluationCard evaluation={evaluation} onChanged={onChanged} hasParticipationToggle {...rest} />;
}

export const UpdateClassParticipationEvaluationCardMemoed = memo(UpdateClassParticipationEvaluationCard);
