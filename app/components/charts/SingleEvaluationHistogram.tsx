import { useMemo, useState } from "react";
import { t } from "i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FragmentOf, ResultOf, readFragment } from "gql.tada";
import { getColorForGrade } from "../../helpers/dataMappers";
import CView, { CViewProps } from "../primitives/CView";
import StyledBarChart, { StyledBarChartDataType } from "./StyledBarChart";
import CText from "../primitives/CText";
import CButton from "../primitives/CButton";
import { COLORS } from "../../theme";
import CModal from "../modals/CModal";
import { EvaluationsAccordion_Evaluation_Fragment } from "../evaluations/EvaluationsAccordion";

type FilterValue = "all" | "skills" | "behaviour";

type TempDataType = {
  skillCount: number;
  behaviourCount: number;
};
type TempDataHash = { [grade: number]: TempDataType };

const mapToTempData = (evaluations: ResultOf<typeof EvaluationsAccordion_Evaluation_Fragment>[]) => {
  const tempData: TempDataHash = {};
  [4, 5, 6, 7, 8, 9, 10].forEach((grade) => {
    tempData[grade] = {
      skillCount: 0,
      behaviourCount: 0,
    };
  });
  evaluations.forEach((evaluation) => {
    if (evaluation.behaviourRating) {
      const behaviourNumber = evaluation.behaviourRating;
      tempData[behaviourNumber].behaviourCount += 1;
    }
    if (evaluation.skillsRating) {
      const skillNumber = evaluation.skillsRating;
      tempData[skillNumber].skillCount += 1;
    }
  });
  return tempData;
};

const filterTempDataToChartData = (data: TempDataHash, typeFilter: string) => {
  const filteredData: StyledBarChartDataType[] = [];
  Object.keys(data).forEach((key) => {
    const grade = parseInt(key, 10);
    const gradeObj = data[grade];
    let count = 0;
    if (["all", "skills"].includes(typeFilter)) {
      count += gradeObj.skillCount;
    }
    if (["all", "behaviour"].includes(typeFilter)) {
      count += gradeObj.behaviourCount;
    }
    filteredData.push({ x: key, y: count, color: getColorForGrade(grade) });
  });
  return filteredData;
};

type EvaluationsHistogramProps = CViewProps & {
  evaluations: ({ id: string } & FragmentOf<typeof EvaluationsAccordion_Evaluation_Fragment>)[];
};

export default function SingleEvaluationHistogram({ evaluations: evaluationFragments, ...rest }: EvaluationsHistogramProps) {
  const [typeFilter, setTypeFilter] = useState<FilterValue>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const evaluations = readFragment(EvaluationsAccordion_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const data = useMemo(() => mapToTempData(filteredEvaluations), [filteredEvaluations]);
  const filteredData = useMemo(() => filterTempDataToChartData(data, typeFilter), [data, typeFilter]);

  return (
    <>
      <CModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} closeButton={false} placement="bottom">
        <CView style={{ padding: "md", gap: 20 }}>
          <CView style={{ gap: 10 }}>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("skills-and-behaviour", "Taidot ja työskentely")}</CText>
            <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%", padding: "md" }}>
              <CButton
                key="all"
                title={t("all", "Kaikki")}
                variant="outline"
                colorScheme={typeFilter !== "all" ? "lightgray" : "darkgray"}
                style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                onPress={() => setTypeFilter("all")}
                textStyle={{ fontSize: "xs", fontWeight: "400", color: typeFilter !== "all" ? "gray" : "darkgray" }}
              />
              {["skills", "behaviour"].map((item) => (
                <CButton
                  key={item}
                  title={t(item)}
                  variant="outline"
                  colorScheme={item === typeFilter ? "darkgray" : "lightgray"}
                  style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                  onPress={() => setTypeFilter(item as FilterValue)}
                  textStyle={{ fontSize: "xs", fontWeight: "400", color: item === typeFilter ? "darkgray" : "gray" }}
                />
              ))}
            </CView>
          </CView>
          <CButton title={t("use", "Käytä")} onPress={() => setIsFiltersOpen(false)} />
        </CView>
      </CModal>
      <CView style={{ width: "100%" }}>
        <CView style={{ flexDirection: "row", alignItems: "center" }}>
          <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>{t("evaluation-distribution", "Arvosanajakauma")}</CText>
          <CButton
            size="small"
            variant="outline"
            title={t("filter", "Suodata")}
            colorScheme="darkgray"
            style={{ width: "auto" }}
            leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
            rightIcon={typeFilter !== "all" ? <CView style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "primary" }} /> : undefined}
            onPress={() => setIsFiltersOpen(true)}
          />
        </CView>
        <CView style={{ width: "100%" }}>
          <StyledBarChart data={filteredData} countAxis showAxisLabels style={{ height: 200 }} {...rest} />
        </CView>
      </CView>
    </>
  );
}
