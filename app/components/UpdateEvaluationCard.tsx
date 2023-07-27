import { Student } from "arwi-backend/src/types";
import { useCallback, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { Switch } from "react-native";
import { CreateEvaluationInput } from "../gql/graphql";
import Card from "./Card";
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

type UpdateEvaluationCardProps = Omit<CViewProps, "children"> & {
  hasParticipationToggle?: boolean;
  evaluation: Evaluation;
  onChanged?: (evaluation: Evaluation) => void;
};

type EvaluationPropKeys = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";

export default function UpdateEvaluationCard({
  evaluation: initialEvaluation,
  onChanged: onChangedCallback,
  hasParticipationToggle = true,
  ...rest
}: UpdateEvaluationCardProps) {
  const [evaluation, setEvaluation] = useState(initialEvaluation);
  const [notes, setNotes] = useState(() => evaluation.notes || "");

  const { t } = useTranslation();

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

  const debouncedOnChanged = useMemo(() => debounce(onChanged, 300), [onChanged]);

  const changeNotes = (value: string) => {
    setNotes(value);

    debouncedOnChanged("notes", value);
  };

  const givenNotesCount = useMemo(() => {
    return evaluation.student.currentClassEvaluations.filter((it) => !!it.notes).length;
  }, [evaluation]);

  return (
    <Card {...rest} innerViewProps={{ style: { paddingHorizontal: "2xl", paddingVertical: "xl" } }} style={{ alignItems: "center", ...rest.style }}>
      <CText style={{ fontSize: "lg", textAlign: "center", marginBottom: "md" }}>{evaluation.student.name}</CText>
      {/* TODO: Add isStellar star-button */}
      {hasParticipationToggle && (
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 0 }}>
          <CText style={{ textAlign: "center" }}>{t("present", "Paikalla")}</CText>
          <Switch
            trackColor={{ false: COLORS.lightgray, true: COLORS.primary }}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.lightgray}
            onValueChange={(value) => onChanged("wasPresent", value)}
            value={evaluation.wasPresent}
          />
        </CView>
      )}
      <CText style={{ marginBottom: "sm" }}>{t("skills", "Taidot")}:</CText>
      <RatingSelector
        initialRating={evaluation.skillsRating}
        onChange={(rating) => onChanged("skillsRating", rating)}
        style={{ marginBottom: "lg" }}
      />
      <CText style={{ marginBottom: "sm" }}>{t("behaviour", "Työskentely")}:</CText>
      <RatingSelector
        initialRating={evaluation.behaviourRating}
        onChange={(rating) => onChanged("behaviourRating", rating)}
        style={{ marginBottom: "lg" }}
      />
      <CText style={{ marginBottom: "md" }}>
        {t("update-evaluation-notes-given-count", "Sanallinen palaute (annettu {{count}} kertaa)", { count: givenNotesCount })}
      </CText>
      <CTextInput
        as="textarea"
        value={notes}
        onChange={(e) => changeNotes(e.nativeEvent.text)}
        placeholder={t("update-evaluation-notes-placeholder", "Sanallinen palaute oppilaan toiminnasta tunnilla...")}
        multiline
      />
      {/*  TODO: Add speech to text to note text input */}
    </Card>
  );
}
