import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { useEffect } from "react";
import { HomeStackParams } from "../types";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import { graphql } from "../../../gql";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CScrollView from "../../../components/primitives/CScrollView";
import { getCollectionTypeTranslation } from "../../../helpers/translation";
import CButton from "../../../components/primitives/CButton";
import { Accordion } from "../../../components/Accordion";
import { SPACING } from "../../../theme";
import { formatDate } from "../../../helpers/dateHelpers";
import CircledNumber from "../../../components/CircledNumber";
import StyledBarChart, { StyledBarChartDataType } from "../../../components/charts/StyledBarChart";
import { getColorForGrade } from "../../../helpers/dataMappers";
import { parseFloatToGradeString } from "../../../helpers/evaluationUtils";

const DefaultEvaluationCollection_GetCollectionType_Query = graphql(`
  query DefaultEvaluationCollection_GetCollectionType($typeId: ID!) {
    getType(id: $typeId) {
      id
      category
      name
      weight
      defaultTypeCollection {
        id
        date
        evaluations {
          id
          student {
            id
            name
          }
          wasPresent
          notes
          rating
        }
      }
      group {
        id
      }
    }
  }
`);

type TempDataHash = { [grade: number]: number };

export default function DefaultEvaluationCollection({
  route: { params },
  navigation,
}: NativeStackScreenProps<HomeStackParams, "default-evaluation-collection">) {
  const { t } = useTranslation();
  const { data, loading } = useQuery(DefaultEvaluationCollection_GetCollectionType_Query, {
    variables: { typeId: params.id },
  });

  useEffect(() => {
    const collection = data?.getType.defaultTypeCollection;
    if (!params.collectionId && collection) {
      navigation.setParams({ collectionId: collection.id });
    }
  }, [data, navigation, params.collectionId]);

  if (loading || !data) return <LoadingIndicator />;

  const type = data.getType;

  const histogramData: StyledBarChartDataType[] = [];
  const gradeCounts: TempDataHash = {};
  [4, 5, 6, 7, 8, 9, 10].forEach((val) => {
    gradeCounts[val] = 0;
  });
  if (type.defaultTypeCollection) {
    type.defaultTypeCollection.evaluations.forEach((ev) => {
      if (ev.rating) {
        gradeCounts[Math.round(ev.rating)] += 1;
      }
    });
  }
  Object.keys(gradeCounts).forEach((key) => {
    histogramData.push({ x: key, y: gradeCounts[parseInt(key, 10)], color: getColorForGrade(parseInt(key, 10)) });
  });

  return (
    <CView style={{ flexGrow: 1, backgroundColor: "white", paddingHorizontal: "lg", paddingVertical: "2xl" }}>
      <CScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }} showsVerticalScrollIndicator={false}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2xl" }}>
          <CView style={{ gap: 2 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{type.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{getCollectionTypeTranslation(t, type.category as CollectionTypeCategory)}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("evaluated-once", "Kerran arvioitava")}</CText>
            <CText style={{ fontSize: "sm", fontWeight: "500", color: type.defaultTypeCollection ? "primary" : "error" }}>
              {type.defaultTypeCollection ? t("evaluated", "Arvioitu").toLocaleUpperCase() : t("unevaluated", "Ei arvioitu").toLocaleUpperCase()}
            </CText>
          </CView>
          <CircledNumber size={70} valueString={`${type.weight}%`} title={t("weight-value", "Painoarvo")} />
        </CView>

        {!type.defaultTypeCollection && (
          <CButton
            variant="filled"
            title={t("evaluate", "Arvioi")}
            onPress={() => {
              navigation.navigate("default-collection-create", { groupId: type.group.id, collectionTypeId: type.id });
            }}
          />
        )}
        <CView style={{ gap: "lg" }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-distribution", "Arvosanajakauma")}</CText>
          <CView style={{ width: "100%" }}>
            <StyledBarChart data={histogramData} countAxis showAxisLabels style={{ height: 200 }} />
          </CView>
        </CView>
        <CView style={{ gap: "lg" }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluations", "Arvioinnit")}</CText>
            {!params.archived && type.defaultTypeCollection && (
              <CButton
                size="small"
                variant="outline"
                title={t("edit-all", "Muokkaa kaikkia")}
                onPress={() => {
                  navigation.navigate("edit-all-default-evaluations", { collectionId: type.defaultTypeCollection!.id });
                }}
              />
            )}
          </CView>
          {type.defaultTypeCollection && type.defaultTypeCollection.evaluations.length > 0 ? (
            <Accordion
              allowMultiple
              data={[...type.defaultTypeCollection.evaluations]
                .sort((a, b) => a.student.name.localeCompare(b.student.name))
                .map((it) => ({
                  title: it.student.name,
                  date: formatDate(type.defaultTypeCollection!.date),
                  isEvaluated: it.rating !== undefined && it.rating !== null,
                  icons: it.wasPresent && !!it.notes && (
                    <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />
                  ),
                  headerContentRight: (
                    <CircledNumber decimals={0} size={48} valueString={it.wasPresent && it.rating ? parseFloatToGradeString(it.rating) : "-"} />
                  ),
                  content: (
                    <>
                      <CText style={{ fontSize: "sm", fontWeight: "500", color: it.wasPresent ? "green" : "red", paddingBottom: 10 }}>
                        {it.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
                      </CText>
                      {it.wasPresent ? (
                        <CView style={{ gap: 10 }}>
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
                      <CButton
                        size="small"
                        title={t("edit", "Muokkaa")}
                        style={{ marginTop: "md" }}
                        onPress={() => {
                          navigation.navigate("edit-default-evaluation", { evaluationId: it.id });
                        }}
                      />
                    </>
                  ),
                }))}
            />
          ) : (
            <CText style={{ alignSelf: "center", marginTop: 50 }}>{t("no-evaluations", "Ei arviointeja")}</CText>
          )}
        </CView>
      </CScrollView>
    </CView>
  );
}
