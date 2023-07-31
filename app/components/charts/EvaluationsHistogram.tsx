import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup } from "victory-native";
import { useMemo, useState } from "react";
import { t } from "i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { getEnvironments } from "arwi-backend/src/utils/subjectUtils";
import { FragmentType, getFragmentData, graphql } from "../../gql";
import { EvaluationsBarChart_EvaluationFragment } from "../../gql/graphql";
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
  environment: string;
};
type TempDataHash = { [grade: number]: { [environment: string]: TempDataType } };

const INCLUDE_ENVIRONMENT_COUNT_THRESHHOLD = 0;

const mapDataToTempData = (evaluations: EvaluationsBarChart_EvaluationFragment[], environments: string[]) => {
  const tempData: TempDataHash = {};
  [4, 5, 6, 7, 8, 9, 10].forEach((grade, idx) => {
    tempData[grade] = {};
    environments.forEach((env) => {
      tempData[grade][env] = {
        skillCount: 0,
        behaviourCount: 0,
        environment: env,
      };
    });
  });
  evaluations.forEach((evaluation) => {
    if (evaluation.behaviourRating) {
      const behaviourNumber = formatRatingNumber(evaluation.behaviourRating);
      tempData[behaviourNumber][evaluation.collection.environment.label].behaviourCount += 1;
    }
    if (evaluation.skillsRating) {
      const skillNumber = formatRatingNumber(evaluation.skillsRating);
      tempData[skillNumber][evaluation.collection.environment.label].skillCount += 1;
    }
  });
  return tempData;
};

const filterTempDataToChartData = (data: TempDataHash, typeFilter: string, environmentFilter: string) => {
  const filteredData: StyledBarChartDataType[] = [];
  Object.keys(data).forEach((key) => {
    const grade = parseInt(key, 10);
    const gradeObj = data[grade];
    let count = 0;
    if (environmentFilter !== "all") {
      const envObj = gradeObj[environmentFilter];
      if (["all", "skills"].includes(typeFilter)) {
        count += envObj.skillCount;
      }
      if (["all", "behaviour"].includes(typeFilter)) {
        count += envObj.behaviourCount;
      }
    } else {
      Object.values(gradeObj).forEach((envObj) => {
        if (["all", "skills"].includes(typeFilter)) {
          count += envObj.skillCount;
        }
        if (["all", "behaviour"].includes(typeFilter)) {
          count += envObj.behaviourCount;
        }
      });
    }
    filteredData.push({ x: key, y: count, color: getColorForGrade(grade) });
  });
  return filteredData;
};

type EvaluationsHistogramProps = CViewProps & {
  evaluations: readonly FragmentType<typeof EvaluationsBarChart_Evaluation_Fragment>[];
  subjectCode: string;
};

export default function EvaluationsHistogram({ evaluations: evaluationFragments, subjectCode, ...rest }: EvaluationsHistogramProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [environmentFilter, setEnvironmentFilter] = useState("all");

  const environments = getEnvironments(subjectCode);
  const environmentLabels = environments.map((env) => env.label);

  const evaluations = getFragmentData(EvaluationsBarChart_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const data = useMemo(() => mapDataToTempData(filteredEvaluations, environmentLabels), [filteredEvaluations, environmentLabels]);
  const filteredData = useMemo(() => filterTempDataToChartData(data, typeFilter, environmentFilter), [data, typeFilter, environmentFilter]);

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
                  typeFilter !== "all" || environmentFilter !== "all" ? (
                    <CView style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "primary" }} />
                  ) : undefined
                }
                disableTouchEvent
              />
            </MenuTrigger>
            <MenuOptions>
              <CView style={{ padding: "md", gap: 20 }}>
                <CView style={{ gap: 10 }}>
                  <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("environment", "Ympäristöt")}</CText>
                  <CView style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1, width: "100%", padding: "md" }}>
                    <CButton
                      key="all"
                      title={t("all", "Kaikki")}
                      variant="outline"
                      colorScheme={environmentFilter !== "all" ? "lightgray" : "darkgray"}
                      style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                      onPress={() => setEnvironmentFilter("all")}
                      textStyle={{ fontSize: "xs", fontWeight: "400", color: environmentFilter !== "all" ? "gray" : "darkgray" }}
                      leftIcon={<CView style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "black" }} />}
                    />
                    {environments.map((item) => (
                      <CButton
                        key={item.code}
                        title={item.label}
                        variant="outline"
                        colorScheme={item.label === environmentFilter ? "darkgray" : "lightgray"}
                        style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                        onPress={() => setEnvironmentFilter(item.label)}
                        textStyle={{ fontSize: "xs", fontWeight: "400", color: item.label === environmentFilter ? "darkgray" : "gray" }}
                        leftIcon={<CView style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: item.color }} />}
                      />
                    ))}
                  </CView>
                </CView>
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
                      textStyle={{ fontSize: "xs", fontWeight: "400", color: environmentFilter !== "all" ? "gray" : "darkgray" }}
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
