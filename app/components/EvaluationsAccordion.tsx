import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatRatingStringWithNull } from "../helpers/dataMappers";
import { formatDate } from "../helpers/dateHelpers";
import { Accordion, AccordionProps } from "./Accordion";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { SPACING } from "../theme";

const EvaluationsAccordion_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment EvaluationsAccordion_Evaluation on Evaluation {
    id
    notes
    behaviourRating
    skillsRating
    wasPresent
    isStellar
    collection {
      date
      environment {
        label
      }
    }
    student {
      name
    }
  }
`);

type EvaluationsAccordionProps = Omit<AccordionProps, "data"> & {
  evaluations: FragmentType<typeof EvaluationsAccordion_Evaluation_Fragment>[];
  titleFrom?: "student" | "collection";
};

export default function EvaluationsAccordion({
  evaluations: evaluationFragments,
  titleFrom = "collection",
  allowMultiple = true,
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
        title: titleFrom === "collection" ? `${formatDate(it.collection.date)} - ${it.collection.environment.label}` : it.student.name,
        icons: it.wasPresent && (
          <>
            {it.isStellar && <MaterialCommunityIcon name="star-outline" size={20} />}
            {!!it.notes && <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />}
          </>
        ),
        content: (
          <>
            <CText style={{ color: it.wasPresent ? "green" : "red" }}>{it.wasPresent ? "Paikalla" : "Poissa"}</CText>
            {it.wasPresent ? (
              <>
                <CText>
                  {t("behaviour", "Työskentely")}: {formatRatingStringWithNull(it.behaviourRating)}
                </CText>
                <CText>
                  {t("skills", "Taidot")}: {formatRatingStringWithNull(it.skillsRating)}
                </CText>
                {it.notes ? (
                  <CView style={{ marginTop: "md" }}>
                    <CText style={{ marginBottom: "sm" }}>{t("components.EvaluationsAccordion.verbalFeedback", "Sanallinen palaute")}:</CText>
                    <CText>{it.notes}</CText>
                  </CView>
                ) : (
                  <CText style={{ marginTop: "md" }}>
                    {t("components.EvaluationsAccordion.verbalFeedbackNotGiven", "Sanallista palautetta ei annettu")}
                  </CText>
                )}
              </>
            ) : (
              <CText>{t("components.EvaluationsAccordion.studentNotPresent", "Oppilas ei ollut paikalla, ei arviointeja")}</CText>
            )}
            <CButton title={t("edit", "Muokkaa")} style={{ marginTop: "md" }} onPress={() => console.log("Route to evaluation edit")} />
          </>
        ),
      }))}
      {...rest}
    />
  );
}
