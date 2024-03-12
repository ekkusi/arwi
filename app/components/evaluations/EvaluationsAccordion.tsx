import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { formatDate } from "../../helpers/dateHelpers";
import { Accordion, AccordionProps } from "../ui/Accordion";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";
import CView from "../primitives/CView";
import { COLORS, SPACING } from "../../theme";
import CircledNumber from "../ui/CircledNumber";
import { FragmentOf, graphql, readFragment } from "@/graphql";

export const EvaluationsAccordion_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment EvaluationsAccordion_Evaluation on ClassParticipationEvaluation {
    id
    notes
    __typename
    behaviourRating
    skillsRating
    collection {
      date
      environment {
        label {
          fi
        }
        code
        color
      }
    }
    collection {
      date
    }
    wasPresent
    student {
      name
    }
  }
`);

type EvaluationsAccordionProps = Omit<AccordionProps, "data"> & {
  evaluations: FragmentOf<typeof EvaluationsAccordion_Evaluation_Fragment>[];
  type?: "student" | "collection";
  allowEditing?: boolean;
  onAccordionButtonPress?: (id: string) => void;
};

export default function EvaluationsAccordion({
  evaluations: evaluationFragments,
  type = "collection",
  allowMultiple = true,
  allowEditing = true,
  onAccordionButtonPress,
  ...rest
}: EvaluationsAccordionProps) {
  const { t } = useTranslation();
  const evaluations = readFragment(EvaluationsAccordion_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = useMemo(() => {
    if (type === "collection") return evaluations;
    return [...evaluations].sort((a, b) => a.student.name.localeCompare(b.student.name));
  }, [evaluations, type]);

  const formatStateText = (evaluation: (typeof evaluations)[0]) => {
    if (!evaluation.wasPresent) {
      return t("not-present", "Ei paikalla");
    }

    if (!evaluation.behaviourRating || !evaluation.skillsRating) {
      return t("evaluation-not-finished", "Arviointi kesken");
    }

    return t("evaluated", "Arvioitu");
  };

  const formatEvaluationColor = (evaluation: (typeof evaluations)[0]) => {
    if (!evaluation.wasPresent) {
      return COLORS.red;
    }

    if (!evaluation.behaviourRating || !evaluation.skillsRating) {
      return COLORS.yellow;
    }

    return COLORS.green;
  };

  return (
    <Accordion
      allowMultiple={allowMultiple}
      data={sortedEvaluations.map((it) => ({
        key: it.id,
        title: type === "collection" ? `${it.collection.environment.label.fi}` : it.student.name,
        date: formatDate(it.collection.date),
        stateText: formatStateText(it),
        color: formatEvaluationColor(it),
        icons: it.wasPresent && !!it.notes && <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />,
        content: (
          <>
            {type === "collection" && (
              <CText style={{ fontSize: "sm", fontWeight: "500", color: it.wasPresent ? "green" : "red", paddingBottom: 10 }}>
                {it.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
              </CText>
            )}
            {it.wasPresent ? (
              <CView style={{ gap: 10 }}>
                <CView style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <CircledNumber size={48} title={t("skills", "Taidot")} decimals={0} value={it.skillsRating ? it.skillsRating : undefined} />
                  <CircledNumber
                    decimals={0}
                    size={48}
                    title={t("behaviour", "Työskentely")}
                    value={it.behaviourRating ? it.behaviourRating : undefined}
                  />
                </CView>
                {it.notes ? (
                  <CView>
                    <CText style={{ fontSize: "sm" }}>{it.notes}</CText>
                  </CView>
                ) : (
                  <CText style={{ fontSize: "sm" }}>
                    {t("components.EvaluationsAccordion.verbalFeedbackNotGiven", "Sanallista palautetta ei annettu")}
                  </CText>
                )}
              </CView>
            ) : (
              <CText style={{ fontSize: "sm" }}>
                {t("components.EvaluationsAccordion.studentNotPresent", "Oppilas ei ollut paikalla, ei arviointeja")}
              </CText>
            )}
            {allowEditing && (
              <CButton
                size="small"
                title={t("edit", "Muokkaa")}
                style={{ marginTop: "md" }}
                onPress={() => onAccordionButtonPress && onAccordionButtonPress(it.id)}
              />
            )}
          </>
        ),
      }))}
      {...rest}
    />
  );
}
