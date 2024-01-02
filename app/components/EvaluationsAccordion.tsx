import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatDate } from "../helpers/dateHelpers";
import { Accordion, AccordionProps } from "./Accordion";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { SPACING } from "../theme";
import CircledNumber from "./CircledNumber";

const EvaluationsAccordion_Evaluation_Fragment = graphql(/* GraphQL */ `
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
  evaluations: FragmentType<typeof EvaluationsAccordion_Evaluation_Fragment>[];
  titleFrom?: "student" | "collection";
  allowEditing?: boolean;
  onAccordionButtonPress?: (id: string) => void;
};

export default function EvaluationsAccordion({
  evaluations: evaluationFragments,
  titleFrom = "collection",
  allowMultiple = true,
  allowEditing = true,
  onAccordionButtonPress,
  ...rest
}: EvaluationsAccordionProps) {
  const { t } = useTranslation();
  const evaluations = getFragmentData(EvaluationsAccordion_Evaluation_Fragment, evaluationFragments);

  const sortedEvaluations = [...evaluations].sort((a, b) =>
    titleFrom === "collection"
      ? new Date(b.collection.date).getTime() - new Date(a.collection.date).getTime()
      : a.student.name.localeCompare(b.student.name)
  );

  return (
    <Accordion
      allowMultiple={allowMultiple}
      data={sortedEvaluations.map((it) => ({
        title: titleFrom === "collection" ? `${it.collection.environment.label.fi}` : it.student.name,
        date: formatDate(it.collection.date),
        isEvaluated:
          titleFrom === "student"
            ? it.behaviourRating !== undefined && it.behaviourRating !== null && it.skillsRating !== undefined && it.skillsRating !== null
            : undefined,
        color: it.collection.environment.color,
        icons: it.wasPresent && !!it.notes && <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />,
        content: (
          <>
            <CText style={{ fontSize: "sm", fontWeight: "500", color: it.wasPresent ? "green" : "red", paddingBottom: 10 }}>
              {it.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
            </CText>
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
