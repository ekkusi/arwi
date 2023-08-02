import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup } from "victory-native";
import { useMemo, useState } from "react";
import { t } from "i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { getEnvironments } from "arwi-backend/src/utils/subjectUtils";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import {
  EvaluationsAccordion_EvaluationFragment,
  EvaluationsAccordion_EvaluationFragmentDoc,
  EvaluationsBarChart_EvaluationFragment,
} from "../../gql/graphql";
import { formatRatingNumber, getColorForGrade } from "../../helpers/dataMappers";
import { hexToRgbA } from "../../helpers/color";
import CView, { CViewProps } from "../primitives/CView";
import StyledBarChart, { StyledBarChartDataType } from "./StyledBarChart";
import CText from "../primitives/CText";
import CButton from "../primitives/CButton";
import { COLORS } from "../../theme";

const EvaluationsBarChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsBarChart_Evaluation on Evaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      environment {
        label
        code
        color
      }
    }
  }
`);

type TempDataType = {
  skillCount: number;
  behaviourCount: number;
};
type TempDataHash = { [grade: number]: TempDataType };

const mapToTempData = (evaluations: EvaluationsAccordion_EvaluationFragment[]) => {
  const tempData: TempDataHash = {};
  [4, 5, 6, 7, 8, 9, 10].forEach((grade, idx) => {
    tempData[grade] = {
      skillCount: 0,
      behaviourCount: 0,
    };
  });
  evaluations.forEach((evaluation) => {
    if (evaluation.behaviourRating) {
      const behaviourNumber = formatRatingNumber(evaluation.behaviourRating);
      tempData[behaviourNumber].behaviourCount += 1;
    }
    if (evaluation.skillsRating) {
      const skillNumber = formatRatingNumber(evaluation.skillsRating);
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
  evaluations: ({ id: string } & FragmentType<typeof EvaluationsAccordion_EvaluationFragmentDoc>)[];
};

export default function SingleEvaluationHistogram({ evaluations: evaluationFragments, ...rest }: EvaluationsHistogramProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const evaluations = getFragmentData(EvaluationsAccordion_EvaluationFragmentDoc, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const data = useMemo(() => mapToTempData(filteredEvaluations), [filteredEvaluations]);
  const filteredData = useMemo(() => filterTempDataToChartData(data, typeFilter), [data, typeFilter]);

  return (
    <CView style={{ width: "100%" }}>
      <CView style={{ flexDirection: "row", alignItems: "center" }}>
        <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>{t("evaluation-distribution", "Arvosanajakauma")}</CText>
        <CView style={{ flex: 1, alignItems: "flex-end" }}>
          <Menu renderer={renderers.SlideInMenu}>
            <MenuTrigger style={{ borderRadius: 24 }}>
              <CButton
                size="small"
                variant="outline"
                title={t("filter", "Suodata")}
                colorScheme="darkgray"
                style={{ width: "auto" }}
                leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
                rightIcon={
                  typeFilter !== "all" ? <CView style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "primary" }} /> : undefined
                }
                disableTouchEvent
              />
            </MenuTrigger>
            <MenuOptions>
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
                        onPress={() => setTypeFilter(item)}
                        textStyle={{ fontSize: "xs", fontWeight: "400", color: item === typeFilter ? "darkgray" : "gray" }}
                      />
                    ))}
                  </CView>
                </CView>
                <MenuOption onSelect={() => {}}>
                  <CButton title={t("use", "Käytä")} disableTouchEvent />
                </MenuOption>
              </CView>
            </MenuOptions>
          </Menu>
        </CView>
      </CView>
      <CView style={{ width: "100%" }}>
        <StyledBarChart data={filteredData} countAxis showAxisLabels style={{ height: 200 }} {...rest} />
      </CView>
    </CView>
  );
}
