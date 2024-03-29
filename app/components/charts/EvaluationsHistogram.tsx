import { useMemo, useState } from "react";
import { t } from "i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEnvironmentsByLevel } from "arwi-backend/src/utils/subjectUtils";
import { MinimalModuleInfo } from "arwi-backend/src/types";
import { getColorForGrade } from "../../helpers/dataMappers";
import CView, { CViewProps } from "../primitives/CView";
import StyledBarChart, { StyledBarChartDataType } from "./StyledBarChart";
import CText from "../primitives/CText";
import CButton from "../primitives/CButton";
import { COLORS } from "../../theme";
import CModal from "../CModal";
import { getEnvironmentTranslation } from "../../helpers/translation";
import { FragmentOf, ResultOf, graphql, readFragment } from "@/graphql";

export const EvaluationsHistogram_Evaluation_Fragment = graphql(`
  fragment EvaluationsHistogram_Evaluation on ClassParticipationEvaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      environment {
        label {
          fi
        }
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

const mapDataToTempData = (evaluations: ResultOf<typeof EvaluationsHistogram_Evaluation_Fragment>[], environments: string[]) => {
  const tempData: TempDataHash = {};
  [4, 5, 6, 7, 8, 9, 10].forEach((grade) => {
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
      const behaviourNumber = evaluation.behaviourRating;
      tempData[behaviourNumber][evaluation.collection.environment.label.fi].behaviourCount += 1;
    }
    if (evaluation.skillsRating) {
      const skillNumber = evaluation.skillsRating;
      tempData[skillNumber][evaluation.collection.environment.label.fi].skillCount += 1;
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
  evaluations: readonly FragmentOf<typeof EvaluationsHistogram_Evaluation_Fragment>[];
  subjectCode: string;
  moduleInfo: MinimalModuleInfo;
};

export default function EvaluationsHistogram({ evaluations: evaluationFragments, subjectCode, moduleInfo, ...rest }: EvaluationsHistogramProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [environmentFilter, setEnvironmentFilter] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const environments = getEnvironmentsByLevel(subjectCode, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const environmentLabels = environments.map((env) => env.label.fi);

  const evaluations = readFragment(EvaluationsHistogram_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const data = useMemo(() => mapDataToTempData(filteredEvaluations, environmentLabels), [filteredEvaluations, environmentLabels]);
  const filteredData = useMemo(() => filterTempDataToChartData(data, typeFilter, environmentFilter), [data, typeFilter, environmentFilter]);

  return (
    <CView style={{ width: "100%" }}>
      <CModal closeButton={false} onClose={() => setIsFiltersOpen(false)} placement="bottom" isOpen={isFiltersOpen}>
        <CView style={{ padding: "md", gap: 20 }}>
          <CView style={{ gap: 10 }}>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{getEnvironmentTranslation(t, "environments", subjectCode)}</CText>
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
                  title={item.label.fi}
                  variant="outline"
                  colorScheme={item.label.fi === environmentFilter ? "darkgray" : "lightgray"}
                  style={{ margin: 3, paddingHorizontal: "md", gap: "sm" }}
                  onPress={() => setEnvironmentFilter(item.label.fi)}
                  textStyle={{ fontSize: "xs", fontWeight: "400", color: item.label.fi === environmentFilter ? "darkgray" : "gray" }}
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
          <CButton title={t("use", "Käytä")} onPress={() => setIsFiltersOpen(false)} />
        </CView>
      </CModal>
      <CView style={{ flexDirection: "row", alignItems: "center" }}>
        <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>{t("evaluation-distribution", "Arvosanajakauma")}</CText>
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
          onPress={() => setIsFiltersOpen(true)}
        />
      </CView>
      <CView style={{ width: "100%" }}>
        <StyledBarChart data={filteredData} countAxis showAxisLabels style={{ height: 200 }} {...rest} />
      </CView>
    </CView>
  );
}
