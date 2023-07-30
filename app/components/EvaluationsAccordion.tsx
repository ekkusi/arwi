import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatRatingNumber, formatRatingNumberString, formatRatingStringWithNull } from "../helpers/dataMappers";
import { formatDate } from "../helpers/dateHelpers";
import { Accordion, AccordionProps } from "./Accordion";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CView from "./primitives/CView";
import { SPACING } from "../theme";
import CircledNumber from "./CircledNumber";

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
        color
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
        title: titleFrom === "collection" ? `${it.collection.environment.label}` : it.student.name,
        date: formatDate(it.collection.date),
        color: it.collection.environment.color,
        icons: it.wasPresent && (
          <>
            {it.isStellar && <MaterialCommunityIcon name="star-outline" size={20} />}
            {!!it.notes && <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />}
          </>
        ),
        content: (
          <>
            <CText style={{ fontSize: "sm", fontWeight: "500", color: it.wasPresent ? "green" : "red", paddingBottom: 10 }}>
              {it.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
            </CText>
            {it.wasPresent ? (
              <CView style={{ gap: 10 }}>
                <CView style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <CircledNumber
                    size={48}
                    title={t("skills", "Taidot")}
                    decimals={0}
                    value={it.skillsRating ? formatRatingNumber(it.skillsRating) : undefined}
                  />
                  <CircledNumber
                    decimals={0}
                    size={48}
                    title={t("behaviour", "Työskentely")}
                    value={it.behaviourRating ? formatRatingNumber(it.behaviourRating) : undefined}
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
              <CText>{t("components.EvaluationsAccordion.studentNotPresent", "Oppilas ei ollut paikalla, ei arviointeja")}</CText>
            )}
            <CButton size="small" title={t("edit", "Muokkaa")} style={{ marginTop: "md" }} onPress={() => Alert.alert("Muokkaa")} />
          </>
        ),
      }))}
      {...rest}
    />
  );
}
